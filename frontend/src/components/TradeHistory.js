import React, { useState, useEffect } from 'react';
import './TradeHistory.css';

const TradeHistory = ({ userEmail }) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/trade_history?email=${userEmail}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setTrades(data.history);
        }
      } catch (error) {
        console.error("Failed to fetch trade history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userEmail]);

  if (loading) {
    return <div className="history-loading">Loading your trades...</div>;
  }

  return (
    <div className="trade-history-container">
      <h3 className="history-title">Trade History</h3>
      
      {trades.length === 0 ? (
        <div className="empty-history">
          <p>No trades found. Start trading to see your history here!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Side</th>
                <th>Price</th>
                <th>Amount (BTC)</th>
                <th>Total (USD)</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td className="time-col">{trade.timestamp}</td>
                  <td>
                    <span className={`side-badge ${trade.side.toLowerCase()}`}>
                      {trade.side}
                    </span>
                  </td>
                  <td>${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>{trade.qty}</td>
                  <td>${(trade.price * trade.qty).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradeHistory;