#include <iostream>
#include "OrderBook.h"
#include <chrono>

int main() {
    // 1. Instantiate the Engine
    OrderBook engine;

    // 2. Add some initial "Limit Orders" to the book 
    // This creates the "Market Depth" (Sellers high, Buyers low)
    std::cout << "--- Initializing Market ---" << std::endl;
    
    // Adding Sellers (Asks)
    engine.addOrder({101, 155.0, 10, Side::SELL});
    engine.addOrder({102, 152.0, 5,  Side::SELL});

    // Adding Buyers (Bids)
    engine.addOrder({201, 180.0, 20, Side::BUY});
    engine.addOrder({202, 148.0, 10, Side::BUY});

    // 3. Display the state before any trades
    engine.printOrderBook();

    // 4. Trigger a Trade
    // We send a BUY order at a price that matches an existing SELL order
    std::cout << "\n--- New Buy Order Arrives at $152 ---" << std::endl;
    auto start = std::chrono::high_resolution_clock::now();

engine.addOrder({203, 152.0, 5, Side::BUY}); 

auto end = std::chrono::high_resolution_clock::now();
auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);

std::cout << "Order processed in: " << duration.count() << " microseconds" << std::endl;

    // 5. Display the state after the trade
    engine.printOrderBook();

    return 0;
}