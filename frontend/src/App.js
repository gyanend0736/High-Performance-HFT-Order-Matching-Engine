import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './components/Header'; // <-- Import the new component!
import OrderEntry from './components/OrderEntry';
import OrderBook from './components/OrderBook';
import Auth from './components/Auth';
import TradeHistory from './components/TradeHistory';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('trading_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [data, setData] = useState({ bids: [], asks: [] });
  const [currentView, setCurrentView] = useState('trade'); 

  const handleLogin = (userData) => {
    setUser(userData); 
    localStorage.setItem('trading_user', JSON.stringify(userData)); 
  };

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem('trading_user'); 
  };

  useEffect(() => {
    const fetchInitialBook = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_book');
        if (response.ok) {
          const initialData = await response.json();
          setData(initialData); 
        }
      } catch (error) {
        console.error("Error fetching initial book state:", error);
      }
    };

    fetchInitialBook();

    socket.on('update_book', (updatedData) => {
      setData(updatedData);
    });
    return () => socket.off('update_book');
  }, []);

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      
      {/* Drop in the Header and pass it the props it needs! */}
      <Header 
        user={user} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogout={handleLogout} 
      />

      <main className="main-content">
        {currentView === 'trade' ? (
          <div className="trading-layout">
            <OrderEntry 
              userEmail={user.email}
              userBalanceUsd={user.balance_usd}
              userBalanceBtc={user.balance_btc}
              onBalanceUpdate={(newUsd, newBtc) => {
                const updatedUser = { ...user, balance_usd: newUsd, balance_btc: newBtc };
                setUser(updatedUser);
                localStorage.setItem('trading_user', JSON.stringify(updatedUser));
              }}
            />
            <div className="card">
              <OrderBook bids={data.bids} asks={data.asks} />
            </div>
          </div>
        ) : (
          <div className="card full-width">
            <TradeHistory userEmail={user.email} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;