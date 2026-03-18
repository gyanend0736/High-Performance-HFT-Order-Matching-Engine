#ifndef ORDERBOOK_H
#define ORDERBOOK_H

#include <map>
#include <list>
#include <vector>
#include <string>
#include <iostream> 
#include "Order.h"
using namespace std;

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

    // Changed to return the trade details
    vector<vector<double>> match();

public:
    // Changed to return the matched trades back to Python
    vector<vector<double>> addOrder(Order order);

    // Returns a summary of the current market state (for the UI/Main)
    void printOrderBook() const;
    vector<map<string, double>> getBids() const;
    vector<map<string, double>> getAsks() const;

    BookSummary get_summary() const;
};

#endif