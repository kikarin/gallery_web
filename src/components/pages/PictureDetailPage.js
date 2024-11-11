import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PictureDetailPage.css';

const PictureDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Get image URL from location state
  const imageUrl = location.state?.imageUrl;

  const downloadImageHandler = async () => {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      
      // Extract filename from URL or use default
      const filename = imageUrl.split('/').pop() || 'downloaded_image.jpg';
      link.download = filename;
      
      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      showNotification('Image downloaded successfully!', 'success');
    } catch (error) {
      console.error('Failed to download image:', error);
      showNotification('Failed to download image', 'error');
    }
  };

  const showNotification = (message, type) => {
    // Create snackbar element
    const snackbar = document.createElement('div');
    snackbar.className = `snackbar ${type}`;
    snackbar.textContent = message;
    document.body.appendChild(snackbar);

    // Remove snackbar after animation
    setTimeout(() => {
      snackbar.classList.add('fade-out');
      setTimeout(() => {
        snackbar.remove();
      }, 300);
    }, 3000);
  };

  if (!imageUrl) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>No image URL provided</p>
      </div>
    );
  }

  return (
    <div className="picture-detail-content">
      {!imageError && !isLoading && (
        <div className="action-buttons">
          <button 
            className="download-button"
            onClick={downloadImageHandler}
            aria-label="Download image"
          >
            <i className="fas fa-download"></i>
          </button>
        </div>
      )}
      <div className="picture-container">
        {imageError ? (
          <div className="error-container">
            <i className="fas fa-image"></i>
            <p>Failed to load image</p>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Picture detail"
            className={`detail-image ${isLoading ? 'loading' : ''}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        )}
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureDetailPage; 