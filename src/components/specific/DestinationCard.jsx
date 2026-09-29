import React from 'react';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';
import './DestinationCard.css';
import SmartImage from '../common/SmartImage';

const DestinationCard = ({ image, title, location, description, price, rating }) => {
  return (
    <div className="destination-card">
      <div className="card-image-wrapper">
        <SmartImage src={image} alt={title} className="card-image" />
        <div className="card-rating">
          <Star size={14} className="star-icon" fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-location">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">From</span>
            <span className="price-value">${price}</span>
          </div>
          <button className="card-action-btn">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
