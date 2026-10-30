import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotalCost,
  selectCartTotalQuantity,
} from '../store/CartSlice';
import './CartItem.css';

/**
 * CartItem.jsx
 * Shopping Cart page for Paradise Nursery.
 *
 * Features:
 *  - Thumbnail, name, unit price per item
 *  - Total cost per item (unit price × quantity)
 *  - Increase / Decrease quantity buttons
 *  - Delete button to remove item from cart
 *  - Grand total of all items
 *  - "Continue Shopping" button → back to product listing
 *  - "Checkout" button → shows "Coming Soon" alert
 */
function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotalCost);
  const cartCount = useSelector(selectCartTotalQuantity);

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('🌿 Coming Soon! Checkout functionality is under construction.');
  };

  return (
    <div className="cart-page">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <span className="navbar-brand">🌿 Paradise Nursery</span>
        <ul className="navbar-links">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>
              Plants
            </a>
          </li>
        </ul>
        {/* Cart icon with live count */}
        <a
          href="#"
          className="cart-icon-wrapper"
          onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
          aria-label={`Cart, ${cartCount} items`}
        >
          🛒
          <span className="cart-count-badge">{cartCount}</span>
        </a>
      </nav>

      {/* ── Cart Content ── */}
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty 🌱</p>
            <button
              className="continue-btn"
              onClick={() => onNavigate('products')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ── Item list ── */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumbnail"
                  />

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">
                      Unit Price: <strong>${item.price.toFixed(2)}</strong>
                    </p>
                    <p className="cart-item-total-price">
                      Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrease(item)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrease(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑 Delete
                  </button>
                </div>
              ))}
            </div>

            {/* ── Cart Summary ── */}
            <div className="cart-summary">
              <p className="cart-total">
                Total Cart Amount:{' '}
                <strong>${cartTotal.toFixed(2)}</strong>
              </p>

              <div className="cart-actions">
                {/* Continue Shopping → back to product list */}
                <button
                  className="continue-btn"
                  onClick={() => onNavigate('products')}
                >
                  ← Continue Shopping
                </button>

                {/* Checkout → "Coming Soon" */}
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
