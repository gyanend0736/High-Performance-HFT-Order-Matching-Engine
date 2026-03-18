import React from 'react';
import './OrderBook.css';

const OrderBook = ({ bids, asks }) => {
  return (
    <div className="orderbook-container">
      
      {/* Left Column: Bids (Buyers) */}
      <div className="orderbook-column bids-column">
        <h3 className="bids-title">Bids</h3>
        
        {/* Sub-headers for clarity */}
        <div className="column-headers">
          <span>Qty</span>
          <span>Price</span>
        </div>

        <div className="order-list">
          {bids && bids.length > 0 ? (
            bids.map((bid, index) => {
              // Extract price and qty regardless of how your backend sends it
              const price = typeof bid === 'object' ? bid.price : bid;
              const qty = typeof bid === 'object' ? bid.quantity : '-';

              return (
                <div key={index} className="order-row bid-row">
                  <span className="qty-text">{qty}</span>
                  <span className="price-text">{price}</span>
                </div>
              );
            })
          ) : (
            <span className="empty-state">No bids available</span>
          )}
        </div>
      </div>

      {/* Right Column: Asks (Sellers) */}
      <div className="orderbook-column asks-column">
        <h3 className="asks-title">Asks</h3>
        
        {/* Sub-headers for clarity */}
        <div className="column-headers">
          <span>Price</span>
          <span>Qty</span>
        </div>

        <div className="order-list">
          {asks && asks.length > 0 ? (
            asks.map((ask, index) => {
              // Extract price and qty regardless of how your backend sends it
              const price = typeof ask === 'object' ? ask.price : ask;
              const qty = typeof ask === 'object' ? ask.quantity : '-';

              return (
                <div key={index} className="order-row ask-row">
                  <span className="price-text">{price}</span>
                  <span className="qty-text">{qty}</span>
                </div>
              );
            })
          ) : (
            <span className="empty-state">No asks available</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default OrderBook;