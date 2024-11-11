import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [galleryItems, setGalleryItems] = useState([]);
  const [infoItems, setInfoItems] = useState([]);
  const [agendaItems, setAgendaItems] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
    fetchInfoItems();
    fetchAgendaItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/galleries');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const fetchInfoItems = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/infos',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setInfoItems(data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching info items:', error);
    }
  };

  const fetchAgendaItems = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/agendas',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAgendaItems(data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching agenda items:', error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all" />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Welcome Banner - Desktop optimized */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-[#446496] to-[#88A5DB] p-8 lg:p-12 rounded-xl shadow-xl mb-8 
                      transform hover:scale-[1.02] transition-transform duration-300">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-2/3">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
                SMKN 4 Kota Bogor Gallery
              </h1>
              <p className="text-white text-lg lg:text-xl opacity-90 font-light lg:pr-8">
                Jelajahi momen terbaik yang diabadikan oleh sekolah kami
              </p>
            </div>
            <div className="w-32 h-32 lg:w-48 lg:h-48 mx-auto lg:mx-0 mt-6 lg:mt-0 
                          animate-scale-in bg-white/10 rounded-full p-4 backdrop-blur-sm">
              <img
                src="/images/LOGO.png"
                alt="Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Featured Carousel - Desktop optimized */}
        <div className="mb-12">
          <Slider {...carouselSettings} className="rounded-xl overflow-hidden shadow-lg">
            {[
              'unnamed.jpg',
              'smkn4bogor_2.jpg',
              'maxresdefault.jpg',
              'smkn4bogor_3.jpg'
            ].map((image, index) => (
              <div key={index} className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`/images/${image}`}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[300px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            ))}
          </Slider>
        </div>

       
        {/* Content Sections - Desktop optimized */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Gallery Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark">Gallery</h2>
              <button
                onClick={() => navigate('/gallery')}
                className="btn-primary flex items-center"
              >
                Lihat Semua
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid gap-4">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="card p-4 flex items-center space-x-4 cursor-pointer"
                  onClick={() => navigate('/gallery')}
                >
                  <img
                    src={item.photos?.[0]?.image_url || '/placeholder.jpg'}
                    alt={item.title}
                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-400 text-lg">{item.title}</h3>
                    <p className="text-gray-500 mt-2">Click to view details</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info and Agenda Sections */}
          <div className="space-y-12">
            {/* Info Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark">Info</h2>
                <button
                  onClick={() => navigate('/info')}
                  className="btn-primary flex items-center"
                >
                  Lihat Semua
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-4">
                {infoItems.map((item, index) => (
                  <div
                    key={index}
                    className="card p-6 cursor-pointer"
                    onClick={() => navigate('/info')}
                  >
                    <h3 className="font-semibold text-gray-400 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-300 line-clamp-2">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Agenda Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark">Agenda</h2>
                <button
                  onClick={() => navigate('/agenda')}
                  className="btn-primary flex items-center"
                >
                  Lihat Semua
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-4">
                {agendaItems.map((item, index) => (
                  <div
                    key={index}
                    className="card p-6 cursor-pointer"
                    onClick={() => navigate('/agenda')}
                  >
                    <h3 className="font-semibold text-gray-400 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-300 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 