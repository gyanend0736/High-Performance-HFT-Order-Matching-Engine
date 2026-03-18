import React from 'react';
import './Header.css'; // Let's move its styles here for a clean architecture

const Header = ({ user, currentView, setCurrentView, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <h2 className="logo">⚡ ProTrade</h2>
        <nav className="header-nav">
          <button 
            className={currentView === 'trade' ? 'active' : ''} 
            onClick={() => setCurrentView('trade')}
          >
            Trade
          </button>
          <button 
            className={currentView === 'history' ? 'active' : ''} 
            onClick={() => setCurrentView('history')}
          >
            Trade History
          </button>
        </nav>
      </div>

      <div className="header-right">
        <span className="balance-badge">
          ${Number(user.balance_usd || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;