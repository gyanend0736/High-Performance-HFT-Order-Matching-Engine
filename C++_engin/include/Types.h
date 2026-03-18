#ifndef TYPES_H
#define TYPES_H

#include <cstdint>

// Using type aliases for clarity
using Price = double;
using Quantity = uint32_t;
using OrderID = uint64_t;

enum class Side {
    BUY,
    SELL
};

#endif


