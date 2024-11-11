import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgendaPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState([]);
  const [filteredAgendas, setFilteredAgendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasError, setHasError] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  useEffect(() => {
    fetchAgendas();
  }, []);

  useEffect(() => {
    filterAgendas();
  }, [searchTerm, agendas]);

  const fetchAgendas = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/agendas',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Sort agendas by event_date from newest to oldest
        const sortedData = data.sort((a, b) => {
          return new Date(b.event_date) - new Date(a.event_date);
        });
        setAgendas(sortedData);
        setFilteredAgendas(sortedData);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error('Error fetching agendas:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAgendas = () => {
    const filtered = agendas.filter(agenda => 
      agenda.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgendas(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCardClick = (agenda) => {
    setSelectedAgenda(agenda);
  };

  const handleBack = () => {
    setSelectedAgenda(null);
  };

  const AgendaCard = ({ agenda }) => (
    <div 
      className="card mb-6 overflow-hidden transform transition-all duration-300 hover:scale-[1.02]
                 cursor-pointer"
      onClick={() => handleCardClick(agenda)}
    >
      <div className="bg-gradient-to-br from-[#446496] to-[#88A5DB] p-6 rounded-xl">
        <div className="flex items-center mb-2">
          <i className="material-icons text-white mr-2">event</i>
          <h3 className="text-xl font-bold text-white drop-shadow">
            {agenda.title || 'No Title'}
          </h3>
        </div>
        
        <div className="bg-black/10 rounded-xl p-4 mb-3">
          <p className="text-white line-clamp-3">
            {agenda.description?.length > 100 
              ? `${agenda.description.substring(0, 100)}...` 
              : agenda.description || 'No Description'
            }
          </p>
        </div>

        <div className="flex items-center text-white/70">
          <i className="material-icons text-sm mr-2">calendar_today</i>
          <span className="text-sm italic">
            Date: {formatDate(agenda.event_date)}
          </span>
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
        <p className="text-xl text-red-500 mb-4">Failed to load agendas.</p>
        <button
          onClick={fetchAgendas}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedAgenda) {
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
              {selectedAgenda.title}
            </h1>
            <p className="text-gray-600 italic mb-6">
              Date: {formatDate(selectedAgenda.event_date)}
            </p>
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedAgenda.description}
                </p>
              </div>
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
            placeholder="Search Agenda"
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

      {filteredAgendas.length === 0 ? (
        <div className="text-center py-12">
          <i className="material-icons text-6xl text-gray-300">event</i>
          <p className="mt-4 text-gray-500">No agendas available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAgendas.map((agenda) => (
            <AgendaCard key={agenda.id} agenda={agenda} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgendaPage; 