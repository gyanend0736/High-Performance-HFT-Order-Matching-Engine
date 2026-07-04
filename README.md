# HFT Order Matching Engine

A high-performance limit order book built in C++ with a Node.js backend and a real-time React dashboard.

[![C++17](https://img.shields.io/badge/C++-17-blue.svg)](https://isocpp.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is this?

A full-stack order matching engine that simulates how a real stock or crypto exchange processes trades. Client applications submit buy and sell orders via REST API. The C++ engine matches them in microseconds using strict price-time priority, streams live trade events over WebSocket, and renders the order book depth in real time on a React dashboard.

**Performance:** O(log n) insertion · microsecond-level matching via `std::chrono` · sub-200ms end-to-end API latency

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  React Dashboard                 │
│   Bid/Ask Depth · Trade Feed · Spread Tracker   │
└─────────────────────┬───────────────────────────┘
                      │ WebSocket (live events)
                      │ REST (order submission)
┌─────────────────────▼───────────────────────────┐
│              Node.js / Express Server            │
│         REST API  ·  WebSocket Server            │
└─────────────────────┬───────────────────────────┘
                      │ node-addon-api (N-API)
                      │ Native binding — zero serialisation overhead
┌─────────────────────▼───────────────────────────┐
│              C++ Order Matching Engine           │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Limit Order Book               │   │
│  │                                          │   │
│  │  Bids (std::map — High → Low)            │   │
│  │  Asks (std::map — Low → High)            │   │
│  │                                          │   │
│  │  Price-time priority via std::list       │   │
│  │  O(log n) insert · O(1) dequeue          │   │
│  └──────────────────┬───────────────────────┘   │
│                     │ match()                    │
│  ┌──────────────────▼───────────────────────┐   │
│  │         Trade Settlement Records         │   │
│  │  buyer_id · seller_id · price · qty      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Component breakdown

| Component | Responsibility |
|---|---|
| **C++ Engine** | Maintains the limit order book, matches orders by price-time priority, returns structured Trade records |
| **node-addon-api binding** | Exposes the C++ engine as a native Node.js module — no subprocess, no serialisation |
| **Express REST API** | Accepts order submissions, validates input, calls the C++ engine synchronously |
| **WebSocket Server** | Broadcasts trade events and book depth updates to all connected clients in real time |
| **React Dashboard** | Renders live bid/ask depth, trade feed, and spread tracker via WebSocket events |

---

## Features

- **Price-time priority matching** — bids sorted high to low, asks sorted low to high via `std::map` with custom comparators
- **Partial fills** — orders partially matched and remainders kept in the book
- **4-field Trade records** — every match returns `(buyer_id, seller_id, execution_price, quantity_filled)`
- **Real-time WebSocket feed** — trade events pushed to the React frontend instantly
- **2-sided depth display** — live bid and ask levels visualised in the dashboard
- **Zero polling** — pure WebSocket push, no client-side polling
- **Native Node.js addon** — C++ engine bound via N-API for zero-overhead calls from JavaScript

---

## Tech stack

| Layer | Technology |
|---|---|
| Matching engine | C++17 — `std::map`, `std::list`, `std::chrono` |
| Native binding | node-addon-api (N-API) |
| Backend | Node.js 20, Express, ws |
| Frontend | React 18, Recharts |
| Build | CMake, node-gyp |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 9+
- C++17 compiler (GCC 11+ or Clang 14+)
- CMake 3.16+
- Python 3 (required by node-gyp)

### Quick start

```bash
# Clone the repo
git clone https://github.com/gyanend0736/hft-order-matching-engine.git
cd hft-order-matching-engine

# Install dependencies and build the C++ native addon
npm install

# Start the Node.js backend (builds addon automatically)
npm run server

# In a second terminal — start the React frontend
npm run client

# Backend → http://localhost:4000
# Dashboard → http://localhost:3000
```

### Build the C++ addon manually

```bash
# From the project root
npx node-gyp configure
npx node-gyp build

# Addon output: build/Release/trading_engine.node
```

---

## Project structure

```
hft-order-matching-engine/
├── engine/                      # C++ source
│   ├── src/
│   │   ├── Types.h              # Price, Quantity, OrderID, Side
│   │   ├── Order.h              # Order and Trade structs
│   │   ├── OrderBook.h          # OrderBook class declaration
│   │   ├── OrderBook.cpp        # Matching logic — addOrder(), match()
│   │   └── binding.cpp          # node-addon-api bindings
│   └── binding.gyp              # node-gyp build config
├── server/                      # Node.js backend
│   ├── index.js                 # Express + WebSocket server
│   ├── routes/
│   │   └── orders.js            # POST /orders, GET /book
│   └── broadcast.js             # WebSocket broadcast helper
├── client/                      # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── OrderBookDepth.jsx   # Bid/ask depth table
│   │       ├── TradeFeed.jsx        # Live trade list
│   │       └── SpreadTracker.jsx    # Real-time spread chart
│   └── package.json
├── binding.gyp                  # node-gyp root config
├── package.json
└── README.md
```

---

## API reference

### Submit an order

```
POST /orders
Content-Type: application/json
```

```json
{
  "id": 101,
  "price": 152.00,
  "quantity": 10,
  "side": "BUY"
}
```

**Response — no match:**
```json
{
  "status": "queued",
  "trades": []
}
```

**Response — match found:**
```json
{
  "status": "matched",
  "trades": [
    {
      "buyer_id": 101,
      "seller_id": 202,
      "execution_price": 152.00,
      "quantity_filled": 10
    }
  ]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | number | Yes | Unique order identifier |
| `price` | number | Yes | Limit price |
| `quantity` | number | Yes | Number of units |
| `side` | string | Yes | `"BUY"` or `"SELL"` |

### Get current book depth

```
GET /book
```

```json
{
  "bids": [
    { "price": 152.00, "quantity": 20 },
    { "price": 150.00, "quantity": 15 }
  ],
  "asks": [
    { "price": 153.00, "quantity": 10 },
    { "price": 155.00, "quantity": 5 }
  ]
}
```

### WebSocket events

Connect to `ws://localhost:4000`

```json
{
  "event": "trade",
  "data": {
    "buyer_id": 101,
    "seller_id": 202,
    "execution_price": 152.00,
    "quantity_filled": 10,
    "timestamp": "2026-05-01T10:00:00.000Z"
  }
}
```

```json
{
  "event": "book_update",
  "data": {
    "bids": [...],
    "asks": [...]
  }
}
```

---

## How matching works

### Price-time priority

Orders are stored in two `std::map` structures:

```cpp
// Bids — highest price gets matched first
std::map<Price, std::list<Order>, std::greater<Price>> bids;

// Asks — lowest price gets matched first
std::map<Price, std::list<Order>, std::less<Price>> asks;
```

Within the same price level, a `std::list` maintains FIFO order — the oldest order at a given price is always matched first.

### Matching algorithm

1. On every new order, `match()` runs immediately
2. It compares the highest bid with the lowest ask
3. If `best_bid >= best_ask`, a trade is executed at the ask price
4. Partial fills are handled — quantities are decremented, filled orders are removed
5. Loop continues until no crossing orders remain
6. All trade records are returned to Node.js and broadcast over WebSocket

### Why `std::map`?

`ZPOPMIN` on a sorted set gives O(log n) dequeue — `std::map` with `begin()` gives O(1) access to the best price. Combined with O(log n) insertion, this is the textbook optimal structure for a limit order book.

---

## Why Node.js instead of Python?

| | Python + pybind11 | Node.js + N-API |
|---|---|---|
| WebSocket | Needs separate async setup | Built-in with `ws` library |
| React integration | Needs CORS config | Same ecosystem, seamless |
| Concurrency | GIL limits threading | Event loop handles concurrent connections natively |
| Deployment | Two runtimes to manage | One JS runtime |

---

## Performance

Tested on a local machine (Apple M2, 16GB RAM).

| Metric | Result |
|---|---|
| Order insertion | O(log n) |
| Matching loop | O(k) where k = number of fills |
| Processing time | Microsecond-level (measured via `std::chrono`) |
| API response latency | Sub-200ms end-to-end |
| WebSocket broadcast | < 5ms after trade execution |

---

## Roadmap

- [ ] Cancel order endpoint (`DELETE /orders/:id`)
- [ ] Duplicate order ID validation
- [ ] Integer-based price representation (avoid floating point rounding)
- [ ] Market orders (in addition to limit orders)
- [ ] Order history persistence (SQLite or PostgreSQL)
- [ ] Docker Compose setup

---

## License

MIT — see [LICENSE](LICENSE) for details.
