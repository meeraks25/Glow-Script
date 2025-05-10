import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load wishlist and cart from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Filter products that are in wishlist
        const items = window.products.filter(p => savedWishlist.includes(p.id));
        setWishlistItems(items);
        setCartItems(savedCart);
    }, []);

    const addToCart = (productId) => {
        const newCart = [...cartItems];
        if (!newCart.includes(productId)) {
            newCart.push(productId);
            setCartItems(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
            updateCartCount(newCart.length);
        }
    };

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(newWishlist);
        
        // Update localStorage
        const wishlistIds = newWishlist.map(item => item.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
        
        // Update wishlist count in header
        updateWishlistCount(wishlistIds.length);
    };

    const updateCartCount = (count) => {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    };

    const updateWishlistCount = (count) => {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = count;
            wishlistCount.style.display = count > 0 ? 'block' : 'none';
        }
    };

    return (
        <div className="wishlist-container">
            <h1 className="wishlist-header">Your Wishlist</h1>
            <div className="wishlist-items">
                {wishlistItems.length === 0 ? (
                    <div className="wishlist-empty">
                        Your wishlist is empty. Add some products you love! 💖
                    </div>
                ) : (
                    wishlistItems.map(product => (
                        <div key={product.id} className="wishlist-product" data-id={product.id}>
                            <img 
                                src={`/static/assets/${product.image.split('/').pop()}`} 
                                alt={product.name}
                                className="wishlist-product-image"
                            />
                            <div className="wishlist-product-info">
                                <h3 className="wishlist-product-name">{product.name}</h3>
                                <p className="wishlist-product-price">₹{product.price.toFixed(2)}</p>
                                <div className="wishlist-product-actions">
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                    </button>
                                    <button 
                                        className="remove-from-wishlist"
                                        onClick={() => removeFromWishlist(product.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist; 