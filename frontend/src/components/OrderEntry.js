import React, { useState, useEffect, useRef } from 'react';
import "./OrderEntry.css";

const OrderEntry = ({userEmail, userBalanceUsd=0,userBalanceBtc=0,onBalanceUpdate}) => {
  console.log("OrderEntry is receiving -> USD:", userBalanceUsd, " BTC:", userBalanceBtc);
  const [activeSide, setActiveSide] = useState(null); 
  const [order, setOrder] = useState({ price: '', qty: '' });
  const componentRef = useRef(null);

  const displayBalance= (activeSide==='sell')? 
        `${Number(userBalanceBtc).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} BTC`
        :`$${Number(userBalanceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setActiveSide(null); // Close the form
      }
    };

    // Only attach the listener if the form is open
    if (activeSide) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when component unmounts or activeSide changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSide]);

  const toggleSide = (side) => {
    setActiveSide(activeSide === side ? null : side);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/place_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, side: activeSide,email: userEmail }), 
      });
      const result = await response.json();

      if (response.ok) {
        setOrder({ price: '', qty: '' });
        setActiveSide(null); 
        console.log("Order placed successfully!");
        if (onBalanceUpdate) {
          onBalanceUpdate(result.new_balance_usd, result.new_balance_btc);
        }
      } else {
        // If they don't have enough money, alert them!
        alert(result.message); 
      
      }
    } catch (error) {
      console.error("Error connecting to the backend:", error);
    }
  };

  return (
    <div className="trade-container">
      {/* Attach the ref here so clicking the buttons or form keeps it open */}
      <div className="trade-card" ref={componentRef}>
        
        <div className="action-buttons">
          <button 
            className={`big-btn buy-btn ${activeSide === 'buy' ? 'active' : ''}`} 
            onClick={() => toggleSide('buy')}
          >
            BUY
          </button>
          <button 
            className={`big-btn sell-btn ${activeSide === 'sell' ? 'active' : ''}`} 
            onClick={() => toggleSide('sell')}
          >
            SELL
          </button>
        </div>

        {/* Floating Pop-up Form Container */}
        <div className={`form-popup-container ${activeSide ? 'open' : ''}`}>
          <div className="form-content">
            <div className="balance-info">
              <span>Available Balance</span>
              <strong>{displayBalance}</strong>
            </div>

            <form onSubmit={handleSubmit} className="order-form">
              <div className="input-group">
                <label>Limit Price</label>
                <div className={`input-wrapper ${activeSide}`}>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    step="0.01"
                    value={order.price} 
                    onChange={e => setOrder({...order, price: e.target.value})} 
                    required 
                  />
                  <span className="currency-tag">USD</span>
                </div>
              </div>

              <div className="input-group">
                <label>Amount</label>
                <div className={`input-wrapper ${activeSide}`}>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={order.qty} 
                    onChange={e => setOrder({...order, qty: e.target.value})} 
                    required 
                  />
                  <span className="currency-tag">BTC</span>
                </div>
              </div>

              <div className="total-preview">
                <span>Total Est.</span>
                <span>${(order.price * order.qty || 0).toLocaleString()}</span>
              </div>

              <button type="submit" className={`submit-btn ${activeSide}`}>
                Confirm {activeSide ? activeSide.toUpperCase() : ''}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderEntry;