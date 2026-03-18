from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os
import platform
import time
from pymongo import MongoClient
from threading import Thread
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv 

if platform.system() == "Windows":
    os.add_dll_directory(r"C:\msys64\ucrt64\bin")
    
import trading_engine 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


#----------------------------------------------------------------------------------
# Mongo intialization
#----------------------------------------------------------------------------------
load_dotenv()
MONGO_URI = os.getenv("MONGODB_URL")
try:
    client= MongoClient(MONGO_URI)
    db= client['Cluster0']

    user_collection= db['user']
    trade_collection= db['trade_history']

    client.admin.command('ping')
    print("SUCESS CONNECTION MONGODB")

except Exception as e:
    print("❌ Failed to connect to MongoDB:", e)




book = trading_engine.OrderBook()
book = trading_engine.OrderBook()

# ----------------------------------------------------------------------------------
# NEW: Order Book State Recovery (Fixes the Amnesia Bug!)
# ----------------------------------------------------------------------------------
try:
    # 1. Find all orders in MongoDB that haven't been filled yet
    open_orders = db['orders'].find({"status": "open"})
    restored_count = 0
    
    # 2. Loop through them and inject them back into C++ memory
    for o in open_orders:
        side = trading_engine.Side.BUY if o['side'] == 'buy' else trading_engine.Side.SELL
        restored_order = trading_engine.Order(
            int(o['order_id']), 
            float(o['price']), 
            int(o['qty']), 
            side
        )
        book.add_order(restored_order) 
        restored_count += 1
        
    print(f"✅ STATE RECOVERY: Successfully restored {restored_count} open orders into C++ memory!")

except Exception as e:
    print("⚠️ State Recovery skipped or failed:", e)
# ----------------------------------------------------------------------------------
#----------------------------------------------------------------------------------
# Route for placing order
#----------------------------------------------------------------------------------
@app.route('/place_order', methods=['POST'])
def place_order():
    try:
        data = request.json
        email = data.get('email') 
        
        # 1. Find the user
        user = user_collection.find_one({"email": email})
        if not user:
            return jsonify({"status": "error", "message": "User not found"}), 404

        side_input = data.get('side', 'buy').lower()
        price = float(data['price'])
        qty = int(float(data['qty'])) 
        total_cost_usd = price * qty
        
        # 2. CHECK BALANCES 
        if side_input == 'buy':
            if user.get('balance_usd', 0) < total_cost_usd:
                return jsonify({"status": "error", "message": "Insufficient USD balance"}), 400
        else: 
            if user.get('balance_btc', 0) < qty:
                return jsonify({"status": "error", "message": "Insufficient BTC balance"}), 400
            
        # 3. SELF-TRADE PREVENTION
        if side_input == 'buy':
            wash_trade = db['orders'].find_one({"email": email, "side": "sell", "status": "open", "price": {"$lte": price}})
        else:
            wash_trade = db['orders'].find_one({"email": email, "side": "buy", "status": "open", "price": {"$gte": price}})

        if wash_trade:
            return jsonify({"status": "error", "message": "Self-Trade Prevention: Cannot match against your own orders."}), 400

        # 4. CREATE C++ ORDER OBJECT
        side = trading_engine.Side.BUY if side_input == 'buy' else trading_engine.Side.SELL
        order_id = int(data.get('id', time.time() * 1000))
        new_order = trading_engine.Order(order_id, price, qty, side)

        # 5. DEDUCT INITIAL FUNDS (Locking)
        if side_input == 'buy':
            user_collection.update_one({"email": email}, {"$inc": {"balance_usd": -total_cost_usd}})
        else:
            user_collection.update_one({"email": email}, {"$inc": {"balance_btc": -qty}})

        # 6. SAVE TO DB AS 'OPEN'
        db['orders'].insert_one({
            "order_id": order_id, "email": email, "price": price, 
            "qty": qty, "side": side_input, "status": "open", 
            "timestamp": datetime.utcnow()
        })

        # ---------------------------------------------------------
        # 7. ADD TO C++ ENGINE & GET MATCHES
        # ---------------------------------------------------------
        matched_trades = book.add_order(new_order)
        print(f"\n--- 🛠️ DEBUG: C++ RETURNED: {matched_trades} ---")

        # 8. SETTLEMENT PHASE
        if matched_trades: # This stops the crash if C++ returns nothing!
            for trade in matched_trades:
                bid_id = int(trade[0])
                ask_id = int(trade[1])
                match_price = float(trade[2])
                match_qty = float(trade[3])
                
                print(f"🛠️ Processing Match - BidID: {bid_id}, AskID: {ask_id}")

                buyer_order = db['orders'].find_one({"order_id": bid_id})
                seller_order = db['orders'].find_one({"order_id": ask_id})

                print(f"🛠️ Found Buyer in DB? {bool(buyer_order)} | Found Seller in DB? {bool(seller_order)}")

                if buyer_order and seller_order:
                    buyer_email = buyer_order['email']
                    seller_email = seller_order['email']

                    # A. Give the assets!
                    user_collection.update_one({"email": buyer_email}, {"$inc": {"balance_btc": match_qty}})
                    user_collection.update_one({"email": seller_email}, {"$inc": {"balance_usd": match_price * match_qty}})

                    # B. Log to trade history
                    db['trade_history'].insert_one({
                        "price": match_price, "qty": match_qty,
                        "buyer_email": buyer_email, "seller_email": seller_email,
                        "timestamp": datetime.utcnow()
                    })

                    # C. DELETE/MARK AS FILLED! (This is what you were missing!)
                    db['orders'].update_one({"order_id": bid_id}, {"$set": {"status": "filled"}})
                    db['orders'].update_one({"order_id": ask_id}, {"$set": {"status": "filled"}})
                    
                    print("✅ SETTLEMENT COMPLETE: MongoDB successfully updated!")
                else:
                    print("❌ ERROR: Could not find the original orders in the database to settle them!")

        # 9. Broadcast Order Book updates
        updated_data = {'bids': book.get_bids(), 'asks': book.get_asks()}
        socketio.emit('update_book', updated_data)
        
        # 10. Fetch the absolute final balances from DB to send to React
        refreshed_user = user_collection.find_one({"email": email})
        
        return jsonify({
            "status": "success", 
            "data": updated_data,
            "new_balance_usd": refreshed_user.get('balance_usd', 0),
            "new_balance_btc": refreshed_user.get('balance_btc', 0)
        })
    
    except Exception as e:
        print("❌ FATAL ERROR IN PLACE_ORDER:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 400
#----------------------------------------------------------------------------------
# Route for fetching order
#----------------------------------------------------------------------------------
@app.route('/get_book', methods=['GET'])
def get_book():
    return jsonify({
        'bids': book.get_bids(),
        'asks': book.get_asks()
    })

# ---------------------------------------------------------
# AUTHENTICATION ROUTES
# ---------------------------------------------------------
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"status": "error", "message": "Email and password are required"}), 400

        # Check if user already exists
        existing_user = user_collection.find_one({"email": email})
        if existing_user:
            return jsonify({"status": "error", "message": "User already exists"}), 409

        # Hash the password for security
        hashed_password = generate_password_hash(password)

        # Create the new user with a starting balance of $24,500
        new_user = {
            "email": email,
            "password": hashed_password,
            "balance_usd": 24500.00,
            "balance_btc": 20.00,
            "created_at": datetime.utcnow()
        }

        user_collection.insert_one(new_user)
        
        return jsonify({
            "status": "success", 
            "message": "Account created successfully",
            "email": email,
            "balance_usd": 24500.00,
            "balance_btc": 20.00
        }), 201

    except Exception as e:
        print("Error in signup:", str(e))
        return jsonify({"status": "error", "message": "Server error during signup"}), 500


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Find the user by email
        user = user_collection.find_one({"email": email})

        # If user exists and password matches the hash
        if user and check_password_hash(user['password'], password):
            return jsonify({
                "status": "success",
                "message": "Logged in successfully",
                "balance_usd": user.get('balance_usd', 0),
                "email": user.get('email'),
                "balance_btc": user.get('balance_btc', 0)
            }), 200
        else:
            return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    except Exception as e:
        print("Error in login:", str(e))
        return jsonify({"status": "error", "message": "Server error during login"}), 500

# ---------------------------------------------------------
# Route for fetching Trade History
# ---------------------------------------------------------
@app.route('/trade_history', methods=['GET'])
def get_trade_history():
    email = request.args.get('email')
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400

    try:
        # Find trades where this user was either the buyer OR the seller
        trades_cursor = db['trade_history'].find({
            "$or": [{"buyer_email": email}, {"seller_email": email}]
        }).sort("timestamp", -1) # -1 sorts by newest first
        
        history = []
        for t in trades_cursor:
            # Determine if this specific user bought or sold in this trade
            side = "BUY" if t["buyer_email"] == email else "SELL"
            
            history.append({
                "id": str(t["_id"]),
                "price": t["price"],
                "qty": t["qty"],
                "side": side,
                "timestamp": t["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify({"status": "success", "history": history}), 200

    except Exception as e:
        print("Error fetching trade history:", e)
        return jsonify({"status": "error", "message": "Server error"}), 500
if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)