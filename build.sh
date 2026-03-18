#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Python packages
pip install -r requirements.txt

# 2. Compile the C++ engine for Linux
g++ -O3 -Wall -shared -std=c++17 -fPIC $(python -m pybind11 --includes) -Icpp_engine/include cpp_engine/src/binding.cpp cpp_engine/src/OrderBook.cpp -o trading_engine$(python -c "import sysconfig; print(sysconfig.get_config_var('EXT_SUFFIX'))")