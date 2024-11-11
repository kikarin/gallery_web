import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    filterGalleries();
  }, [searchTerm, galleries]);

  const fetchGalleries = async () => {
    try {
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/galleries',
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setGalleries(sortedData);
        setFilteredGalleries(sortedData);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterGalleries = () => {
    const filtered = galleries.filter(gallery => 
      gallery.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGalleries(filtered);
  };

  const getFullImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith('/storage')) {
      return `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Gallery..."
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

      {/* Gallery Content */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index}
              className="animate-pulse bg-gray-200 rounded-xl aspect-[4/3]"
            />
          ))}
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="text-center py-12">
          <i className="material-icons text-6xl text-gray-900">photo_library</i>
          <p className="mt-4 text-gray-500">No galleries available</p>
        </div>
      ) : (
        filteredGalleries.map((gallery) => (
          <div key={gallery.id} className="mb-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">
              {gallery.title}
            </h2>
            {gallery.photos && gallery.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.photos
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((photo) => (
                    <div 
                      key={photo.id}
                      className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer
                               transform transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => navigate(`/photo/${photo.id}`)}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={getFullImageUrl(photo.image_url)}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t 
                                    from-black/50 to-transparent backdrop-blur-sm
                                    translate-y-full group-hover:translate-y-0 
                                    transition-transform duration-300">
                          <div className="p-4 text-white">
                            <h3 className="font-semibold truncate">{photo.title || 'No title'}</h3>
                            <div className="flex items-center mt-2 text-sm">
                              <span className="opacity-75">View Details</span>
                              <i className="material-icons text-sm ml-1">arrow_forward_ios</i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl">
                <p className="text-gray-500 italic">No photos available</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GalleryPage; 