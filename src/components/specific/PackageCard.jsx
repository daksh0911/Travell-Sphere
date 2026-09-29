import React from 'react';
import { Star, Clock, Heart } from 'lucide-react';
import Button from '../common/Button';
import './PackageCard.css';
import SmartImage from '../common/SmartImage';

const PackageCard = ({ image, days, nights, title, rating, features, price }) => {
  return (
    <div className="package-card">
      <div className="pkg-image-wrapper">
        <SmartImage src={image} alt={title} className="pkg-image" />
        <div className="pkg-duration">
          <Clock size={14} />
          <span>{days} Days / {nights} Nights</span>
        </div>
        <button className="pkg-favorite">
          <Heart size={16} />
        </button>
      </div>
      <div className="pkg-content">
        <div className="pkg-header">
          <h3 className="pkg-title">{title}</h3>
          <div className="pkg-rating">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>
        
        <div className="pkg-features">
          {features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        
        <div className="pkg-footer">
          <div className="pkg-price-sec">
            <span className="pkg-price-label">Starting from</span>
            <span className="pkg-price-value">${price}</span>
          </div>
          <Button variant="primary" size="sm">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
