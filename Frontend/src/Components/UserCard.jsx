import React from 'react';
import './UserCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const UserCard = ({ image, name, price, description, tag, discount, onAddToCart, isFavorite, onToggleFavorite }) => {
  return (
    <div className="user-container">
      <div className="image-wrapper">
        <img className="user-img" src={image} alt={`${name} image`} />
        {discount && <span className="discount-badge">{discount}</span>}
        {tag && <span className="tag-label">{tag}</span>}
        {onToggleFavorite && (
          <button 
            className="favorite-btn" 
            onClick={onToggleFavorite}
            aria-label="Toggle Favorite"
          >
            {isFavorite ? <FaHeart className="fav-icon active" color="#ff4081" /> : <FaRegHeart className="fav-icon" color="#fff" />}
          </button>
        )}
      </div>
      <div className="user-info">
        <p className="user-name">{name}</p>
        <p className="user-price">{price}</p>
      </div>
      <p className="user-desc">{description}</p>
      <button type="button" className="add-to-cart-btn" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default UserCard;