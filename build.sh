#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Python packages
pip install -r requirements.txt

# 2. Compile the C++ engine for Linux (Notice the updated folder paths!)
g++ -O3 -Wall -shared -std=c++17 -fPIC $(python -m pybind11 --includes) cpp_engine/src/binding.cpp cpp_engine/src/OrderBook.cpp -o trading_engine$(python-config --extension-suffix)