import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [infos, setInfos] = useState([]);
  const [filteredInfos, setFilteredInfos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasError, setHasError] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    fetchInfos();
  }, []);

  useEffect(() => {
    filterInfos();
  }, [searchTerm, infos]);

  const fetchInfos = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/infos',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setInfos(sortedData);
        setFilteredInfos(sortedData);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error('Error fetching infos:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filterInfos = () => {
    const filtered = infos.filter(info => 
      info.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInfos(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCardClick = (info) => {
    setSelectedInfo(info);
  };

  const handleBack = () => {
    setSelectedInfo(null);
  };

  const InfoCard = ({ info }) => (
    <div 
      className="card mb-6 overflow-hidden transform transition-all duration-300 hover:scale-[1.02]
                 cursor-pointer"
      onClick={() => handleCardClick(info)}
    >
      <div className="bg-gradient-to-br from-[#446496] to-[#88A5DB] p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
          {info.title || 'No Title'}
        </h3>
        <p className="text-white/70 text-sm mb-3">
          Created on: {formatDate(info.created_at)}
        </p>
        <div className="bg-black/10 rounded-xl p-4">
          <p className="text-white line-clamp-3">
            {info.content?.length > 100 
              ? `${info.content.substring(0, 100)}...` 
              : info.content || 'No Content'
            }
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <i className="material-icons text-5xl text-red-500 mb-4">error</i>
        <p className="text-xl text-red-500 mb-4">Failed to load info.</p>
        <button
          onClick={fetchInfos}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedInfo) {
    return (
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <i className="material-icons mr-2">arrow_back</i>
          Back to List
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary-dark mb-4">
              {selectedInfo.title}
            </h1>
            <p className="text-gray-500 mb-6">
              Posted on {formatDate(selectedInfo.created_at)}
            </p>
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedInfo.content}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {formatDate(selectedInfo.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Info"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-primary/50
                     bg-white/80 backdrop-blur-sm
                     text-primary-dark placeholder-gray-400
                     font-medium"
          />
          <i className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-primary">
            search
          </i>
        </div>
      </div>

      {filteredInfos.length === 0 ? (
        <div className="text-center py-12">
          <i className="material-icons text-6xl text-gray-300">info</i>
          <p className="mt-4 text-gray-500">No info available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredInfos.map((info) => (
            <InfoCard key={info.id} info={info} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoPage; 