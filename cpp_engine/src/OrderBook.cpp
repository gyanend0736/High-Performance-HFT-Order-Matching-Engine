#include "OrderBook.h"
#include <iostream>
#include <algorithm>
using namespace std;

vector<vector<double>> OrderBook::addOrder(Order order) {
    if(order.side == Side::BUY){
        bids[order.price].push_back(order);
    }
    else{
        asks[order.price].push_back(order);
    }
    // Return the result of the match directly to the caller
    return match(); 
}

// Now returns [bid_id, ask_id, match_price, match_quantity]
vector<vector<double>> OrderBook::match() {
    vector<vector<double>> res;
    
    while(!bids.empty() && !asks.empty()){
        auto maxbid = bids.begin();
        auto minask = asks.begin();
        
        if(maxbid->first >= minask->first){
            Order& bidOrder = maxbid->second.front();
            Order& askOrder = minask->second.front();
            uint32_t quanMIN = std::min(bidOrder.quantity, askOrder.quantity);

            std::cout << "TRADE: " << quanMIN << " units @ $" << minask->first 
                      << " (Bid ID: " << bidOrder.id << ", Ask ID: " << askOrder.id << ")\n";

            // Push the 4 crucial pieces of settlement data for Python
            res.push_back({
                (double)bidOrder.id, 
                (double)askOrder.id, 
                (double)minask->first, 
                (double)quanMIN
            });

            bidOrder.quantity -= quanMIN;
            askOrder.quantity -= quanMIN;
            
            if(bidOrder.isFilled()){ maxbid->second.pop_front(); }
            if(askOrder.isFilled()){ minask->second.pop_front(); }

            if(maxbid->second.empty()){ bids.erase(maxbid); }
            if(minask->second.empty()){ asks.erase(minask); }
        }
        else{
            break;
        }
    }
    
    // Crucial: Return the data!
    return res; 
}

// Returns Bids as a simple list for Python/React
vector<map<string, double>> OrderBook::getBids() const {
    vector<map<string, double>> result;
    for (const auto& entry : bids) {
        Price price = entry.first;              // entry.first is the Key
        const list<Order>& orders = entry.second; // entry.second is the Value
        
        uint32_t totalQty = 0;
        for (const auto& o : orders) totalQty += o.quantity;
        result.push_back({{"price", (double)price}, {"quantity", (double)totalQty}});
    }
    return result;
}

// Returns Asks as a simple list for Python/React
vector< map<string, double> > OrderBook::getAsks() const {
    vector< map<string, double> > result;
    for (const auto& entry : asks) {
        Price price = entry.first;              // entry.first is the Key
        const list<Order>& orders = entry.second; // entry.second is the Value
        
        uint32_t totalQty = 0;
        for (const auto& o : orders) totalQty += o.quantity;
        result.push_back({{"price", (double)price}, {"quantity", (double)totalQty}});
    }
    return result;
}

void OrderBook::printOrderBook() const {
    std::cout << "\n--- CURRENT ORDER BOOK ---\n";

    std::cout << "Asks (Sellers):\n";
    if (asks.empty()) {
        std::cout << "  EMPTY\n";
    } else {
        for (auto it = asks.rbegin(); it != asks.rend(); ++it) {
            uint32_t totalQty = 0;
            for (const auto& order : it->second) {
                totalQty += order.quantity;
            }
            std::cout << "  Price: $" << it->first << " | Total Qty: " << totalQty 
                      << " (" << it->second.size() << " orders)\n";
        }
    }

    std::cout << "---------------------------\n";

    std::cout << "Bids (Buyers):\n";
    if (bids.empty()) {
        std::cout << "  EMPTY\n";
    } else {
        for (const auto& entry : bids) {
            Price price = entry.first; 
            const std::list<Order>& orders = entry.second;

            uint32_t totalQty = 0;
            for (const auto& order : orders) {
                totalQty += order.quantity;
            }
            std::cout << "  Price: $" << price << " | Total Qty: " << totalQty 
                    << " (" << orders.size() << " orders)\n";
        }
    }
    std::cout << "---------------------------\n" << std::endl;
}