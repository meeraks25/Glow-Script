import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onWishlistChange }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsWishlisted(wishlist.includes(product.id));
    }, [product.id]);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        let newWishlist;
        
        if (isWishlisted) {
            newWishlist = wishlist.filter(id => id !== product.id);
            showNotification(`${product.name} removed from wishlist`, false);
        } else {
            newWishlist = [...wishlist, product.id];
            showNotification(`${product.name} added to wishlist`, true);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsWishlisted(!isWishlisted);
        updateWishlistCount(newWishlist.length);
        
        if (onWishlistChange) {
            onWishlistChange(newWishlist);
        }
    };

    const showNotification = (message, isAdded) => {
        const notification = document.createElement('div');
        notification.className = 'wishlist-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-heart" style="color: ${isAdded ? '#ff1493' : '#ffb6d5'}"></i>
                <div class="notification-text">
                    <p>${message}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    const updateWishlistCount = (count) => {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = count;
            wishlistCount.style.display = count > 0 ? 'block' : 'none';
        }
    };

    return (
        <div className="product-card" data-id={product.id}>
            <div 
                className={`product-wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={toggleWishlist}
                data-id={product.id}
            >
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="product-badge">{product.offer || ''}</div>
            <img src={`/static/assets/${product.image.split('/').pop()}`} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="product-price-row">
                <span className="product-price">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="product-original-price">
                        ₹{product.originalPrice.toFixed(2)}
                    </span>
                )}
                {product.discount && (
                    <span className="product-discount">{product.discount}</span>
                )}
            </div>
            <div className="product-rating-row">
                <span className="product-rating">{product.rating.toFixed(1)}</span>
                <span className="product-stars">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                </span>
                <span className="product-review-count">({product.reviewCount})</span>
            </div>
            <button className="add-to-cart" data-id={product.id}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard; 