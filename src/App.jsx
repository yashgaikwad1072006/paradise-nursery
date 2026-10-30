import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

/**
 * App.jsx
 * Paradise Nursery — root component.
 *
 * Pages:
 *   'landing'  → Landing / Hero page with company name and "Get Started" button
 *   'products' → Plant product listing
 *   'cart'     → Shopping cart
 *   'about'    → About Us
 */
function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  /* ---- Landing Page ---- */
  if (currentPage === 'landing') {
    return (
      <div className="landing-page">
        <h1>🌿 Paradise Nursery</h1>
        <p className="tagline">
          Bring Nature Indoors — Beautiful Plants, Delivered to Your Door
        </p>
        <button
          className="get-started-btn"
          onClick={() => setCurrentPage('products')}
        >
          Get Started
        </button>
      </div>
    );
  }

  /* ---- Inner pages share the Navbar (rendered inside ProductList / CartItem) ---- */
  return (
    <div className="app">
      {currentPage === 'products' && (
        <ProductList onNavigate={setCurrentPage} />
      )}
      {currentPage === 'cart' && (
        <CartItem onNavigate={setCurrentPage} />
      )}
      {currentPage === 'about' && (
        <>
          {/* Minimal nav for About page */}
          <nav className="navbar">
            <span className="navbar-brand">🌿 Paradise Nursery</span>
            <ul className="navbar-links">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>
                  Plants
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('cart'); }}>
                  Cart
                </a>
              </li>
            </ul>
          </nav>
          <AboutUs />
        </>
      )}
    </div>
  );
}

export default App;
