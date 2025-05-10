import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Wishlist from './components/Wishlist';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load initial state from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setWishlist(savedWishlist);
        setCart(savedCart);
    }, []);

    const handleWishlistChange = (newWishlist) => {
        setWishlist(newWishlist);
    };

    return (
        <Router>
            <div className="app">
                <header>
                    <nav>
                        <div className="logo">Glow Script ✨</div>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/#products">Products</Link></li>
                            <li id="header-wishlist" className="wishlist-icon">
                                <Link to="/wishlist" title="Wishlist">
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span className="wishlist-count" style={{ display: wishlist.length > 0 ? 'block' : 'none' }}>
                                        {wishlist.length}
                                    </span>
                                </Link>
                            </li>
                            <li className="cart-icon">
                                <Link to="/cart" title="Cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <span className="cart-count" style={{ display: cart.length > 0 ? 'block' : 'none' }}>
                                        {cart.length}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={
                            <div className="products-section">
                                <h2>Our Products</h2>
                                <div className="product-grid">
                                    {window.products.map(product => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product}
                                            onWishlistChange={handleWishlistChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        } />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App; 