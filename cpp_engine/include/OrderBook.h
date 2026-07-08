#ifndef ORDERBOOK_H
#define ORDERBOOK_H

#include <map>
#include <list>
#include <vector>
#include <string>
#include <iostream> 
#include "Order.h"
#include<mutex>


// Returns a summary of the book for the frontend
struct BookSummary {
    std::vector<std::pair<Price, Quantity>> bidDepth;
    std::vector<std::pair<Price, Quantity>> askDepth;
};

class OrderBook {
private:
    // Bids: Sorted High to Low 
    std::map<Price, std::list<Order>, std::greater<Price>> bids;

    // Asks: Sorted Low to High
    std::map<Price, std::list<Order>, std::less<Price>> asks;
    std::mutex book_mutex;

    // Changed to return the trade details
    std::vector<Trade> match();

public:
    // Changed to return the matched trades back to Python
    std::vector<Trade> addOrder(Order order);

    // Returns a summary of the current market state (for the UI/Main)
    std::vector<std::map<std::string, double>> getBids() const;
    std::vector<std::map<std::string, double>>  getAsks() const;
    void printOrderBook() const;
};



#endif