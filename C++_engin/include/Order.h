#ifndef ORDER_H
#define ORDER_H

#include "Types.h"

struct Order {
    OrderID id;
    Price price;
    Quantity quantity;
    Side side;

    // A helper to check if the order is fully filled
    bool isFilled() const { return quantity == 0; }
};

// This represents a "Trade" that just happened
struct Trade {
    OrderID buyerId;
    OrderID sellerId;
    Price executionPrice;
    Quantity qtyTransacted;
};

#endif