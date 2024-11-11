import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PictureListPage.css';

const PictureListPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState('Newest');

  useEffect(() => {
    fetchPictures();
  }, [albumId]);

  const fetchPictures = async () => {
    try {
      const response = await axios.get(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/albums/${albumId}/pictures`
      );

      const sortedPictures = sortPictures(response.data, selectedSort);
      setPictures(sortedPictures);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading pictures:', error);
      setIsLoading(false);
    }
  };

  const sortPictures = (pics, sortType) => {
    const sortedPics = [...pics];
    switch (sortType) {
      case 'Newest':
        return sortedPics.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
      case 'Oldest':
        return sortedPics.sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        );
      default:
        return sortedPics;
    }
  };

  const handleSortChange = (event) => {
    const newSortType = event.target.value;
    setSelectedSort(newSortType);
    setPictures(sortPictures(pictures, newSortType));
  };

  const PictureCard = ({ picture }) => (
    <div 
      className="picture-card"
      onClick={() => navigate(`/pictures/detail/${picture.id}`, {
        state: { imageUrl: picture.image_url }
      })}
    >
      <div className="picture-image-container">
        <img
          src={picture.image_url}
          alt={picture.title}
          className="picture-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/broken-image.png';
          }}
        />
      </div>
    </div>
  );

  const ShimmerLoader = () => (
    <div className="shimmer-card">
      <div className="shimmer-effect"></div>
    </div>
  );

  const SortOptions = () => (
    <div className="sort-container">
      <div className="sort-content">
        <i className="fas fa-sort"></i>
        <span>Sort by:</span>
        <select 
          value={selectedSort}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="picture-list-content">
      <SortOptions />
      <div className="picture-grid">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <ShimmerLoader key={index} />
          ))
        ) : (
          pictures.map(picture => (
            <PictureCard 
              key={picture.id} 
              picture={picture} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PictureListPage; 