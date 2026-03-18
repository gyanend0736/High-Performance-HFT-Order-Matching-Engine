#ifdef _WIN32
#include <string.h>
#define strdup _strdup
#endif



#include <pybind11/pybind11.h>
#include <pybind11/stl.h>  // Essential for converting vector/map/list
#include "OrderBook.h"
#include <cstring>

namespace py = pybind11;

PYBIND11_MODULE(trading_engine, m) {
    // Expose the Side enum
    py::enum_<Side>(m, "Side")
        .value("BUY", Side::BUY)
        .value("SELL", Side::SELL)
        .export_values();

    // Expose the Order struct
    py::class_<Order>(m, "Order")
        .def(py::init<uint64_t, double, uint32_t, Side>())
        .def_readwrite("id", &Order::id)
        .def_readwrite("price", &Order::price)
        .def_readwrite("quantity", &Order::quantity)
        .def_readwrite("side", &Order::side);

    // Expose the OrderBook class
    py::class_<OrderBook>(m, "OrderBook")
        .def(py::init<>())
        .def("add_order", &OrderBook::addOrder)
        .def("get_bids", &OrderBook::getBids)
        .def("get_asks", &OrderBook::getAsks)
        .def("print_book", &OrderBook::printOrderBook);
}


// g++ -O3 -Wall -shared -std=c++17 -fPIC `
// >>     -I"include" `
// >>     -I"C:\Users\gyanendra singh\AppData\Local\Programs\Python\Python312\Include" `
// >>     -I"C:\Users\gyanendra singh\AppData\Local\Programs\Python\Python312\Lib\site-packages\pybind11\include" `
// >>     src/binding.cpp src/OrderBook.cpp `
// >>     -o trading_engine.pyd `
// >>     -L"C:\Users\gyanendra singh\AppData\Local\Programs\Python\Python312\libs" `
// >>     -lpython312