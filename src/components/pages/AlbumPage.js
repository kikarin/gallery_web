import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AlbumPage.css';

const AlbumIcon = () => (
  <svg 
    className="album-icon" 
    viewBox="0 0 24 24" 
    width="48" 
    height="48"
  >
    <path 
      fill="currentColor" 
      d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"
    />
  </svg>
);

const AlbumPage = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/albums'
      );

      const sortedAlbums = response.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setAlbums(sortedAlbums);
      setFilteredAlbums(sortedAlbums);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading albums:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = albums.filter(album => 
      album.title.toLowerCase().includes(query)
    );
    setFilteredAlbums(filtered);
  };

  const AlbumCard = ({ album }) => (
    <div 
      className="album-card"
      onClick={() => navigate(`/pictures/${album.id}`)}
    >
      <div className="album-card-content">
        <AlbumIcon />
        <h3>{album.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="album-content">
      <div className="search-container">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search albums..."
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="album-grid">
          {filteredAlbums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;