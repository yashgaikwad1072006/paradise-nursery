import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCartTotalQuantity } from '../store/CartSlice';
import './ProductList.css';

/**
 * ProductList.jsx
 * Displays 18 unique houseplants grouped into 3 categories.
 * Each plant has a thumbnail, name, description, and price.
 * "Add to Cart" button adds to Redux store and disables after click.
 * Navbar shows Home, Plants, Cart with live cart count.
 */

/* ── Plant catalogue ──────────────────────────────────────────── */
const plantCategories = [
  {
    id: 'air-purifying',
    label: 'Air Purifying Plants',
    plants: [
      {
        id: 'ap-1',
        name: 'Peace Lily',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',
        description: 'Elegant white blooms; removes toxins from indoor air.',
      },
      {
        id: 'ap-2',
        name: 'Spider Plant',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
        description: 'Hardy and fast-growing; great for beginners.',
      },
      {
        id: 'ap-3',
        name: 'Snake Plant',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1593691512429-87d04cf9fbcf?w=400&q=80',
        description: 'Virtually indestructible; purifies air overnight.',
      },
      {
        id: 'ap-4',
        name: 'Boston Fern',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        description: 'Lush, feathery fronds; acts as a natural humidifier.',
      },
      {
        id: 'ap-5',
        name: 'Areca Palm',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80',
        description: 'Tropical feel; one of the best air-purifying palms.',
      },
      {
        id: 'ap-6',
        name: "Dracaena 'Marginata'",
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1487530811015-780beb5e38a5?w=400&q=80',
        description: 'Striking red-edged leaves; low-water champion.',
      },
    ],
  },
  {
    id: 'succulents',
    label: 'Succulents & Cacti',
    plants: [
      {
        id: 'sc-1',
        name: 'Aloe Vera',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&q=80',
        description: 'Soothing gel inside; thrives in bright light.',
      },
      {
        id: 'sc-2',
        name: 'Echeveria',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&q=80',
        description: 'Rosette-shaped; comes in stunning pastel hues.',
      },
      {
        id: 'sc-3',
        name: 'Jade Plant',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
        description: 'Said to bring luck and prosperity; very long-lived.',
      },
      {
        id: 'sc-4',
        name: 'Barrel Cactus',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
        description: 'Iconic rounded shape; minimal watering needed.',
      },
      {
        id: 'sc-5',
        name: 'Haworthia',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80',
        description: 'Compact zebra-striped succulent; perfect for desks.',
      },
      {
        id: 'sc-6',
        name: 'String of Pearls',
        price: 11.49,
        image: 'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=400&q=80',
        description: 'Cascading bead-like leaves; stunning in hanging pots.',
      },
    ],
  },
  {
    id: 'tropical',
    label: 'Tropical Foliage',
    plants: [
      {
        id: 'tr-1',
        name: 'Monstera Deliciosa',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
        description: 'Iconic split leaves; the ultimate statement plant.',
      },
      {
        id: 'tr-2',
        name: 'Pothos',
        price: 7.49,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
        description: 'Trailing vine; thrives in low light with minimal care.',
      },
      {
        id: 'tr-3',
        name: 'Bird of Paradise',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
        description: 'Bold, banana-like leaves; dramatic floor plant.',
      },
      {
        id: 'tr-4',
        name: 'Calathea Orbifolia',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
        description: 'Large striped leaves; moves with the light — mesmerising.',
      },
      {
        id: 'tr-5',
        name: 'Fiddle Leaf Fig',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1445251836269-d158eaa028a4?w=400&q=80',
        description: 'Architectural violin-shaped leaves; a design icon.',
      },
      {
        id: 'tr-6',
        name: 'ZZ Plant',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&q=80',
        description: 'Glossy, waxy leaves; almost impossible to kill.',
      },
    ],
  },
];

/* ── Component ────────────────────────────────────────────────── */
function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartTotalQuantity);

  // Track which plant ids have been added so we can disable those buttons
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds((prev) => [...prev, plant.id]);
  };

  return (
    <div className="product-list-page">

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
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>
              About Us
            </a>
          </li>
        </ul>

        {/* Cart icon with live item count */}
        <a
          href="#"
          className="cart-icon-wrapper"
          onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
          aria-label={`Shopping cart, ${cartCount} items`}
        >
          🛒
          <span className="cart-count-badge">{cartCount}</span>
        </a>
      </nav>

      {/* ── Page Header ── */}
      <header className="pl-header">
        <h1>Our Plant Collection</h1>
        <p>Handpicked houseplants to brighten any space.</p>
      </header>

      {/* ── Categories & Plants ── */}
      <main className="pl-main">
        {plantCategories.map((category) => (
          <section key={category.id} className="category-section">
            <h2 className="category-title">{category.label}</h2>
            <div className="plants-grid">
              {category.plants.map((plant) => {
                const isAdded = addedIds.includes(plant.id);
                return (
                  <div key={plant.id} className="plant-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-thumbnail"
                    />
                    <div className="plant-info">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-description">{plant.description}</p>
                      <p className="plant-price">${plant.price.toFixed(2)}</p>
                      <button
                        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
