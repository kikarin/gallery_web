import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const BasePage = ({ title, BodyComponent, currentIndex, onNavItemTapped }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showLoginRequiredNotification = () => {
    // TODO: Implement notification
  };

  const checkLoginStatusAndNavigate = (route) => {
    if (!user.role) {
      showLoginRequiredNotification();
    } else {
      navigate(route);
    }
  };

  const navItems = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'photo_album', label: 'Gallery', route: '/gallery' },
    { icon: 'info', label: 'Info', route: '/info' },
    { icon: 'event', label: 'Agenda', route: '/agenda' },
  ];

  return (
    <div className="min-h-screen bg-[#EBF1F6]"> {/* Abu-abu kebiruan */}
      {/* AppBar */}
      <header className="relative shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#446496] to-[#88A5DB]" />
        <div className="relative container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <i className="material-icons">menu</i>
            </button>
            
            <h1 className="text-white/95 text-xl font-semibold tracking-wider drop-shadow-lg">
              {title}
            </h1>

            <div className="relative">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-lg rounded-full" />
              <button
                onClick={user.role ? handleLogout : () => navigate('/login')}
                className="relative px-4 py-1.5 rounded-full border border-white/30
                         flex items-center space-x-2 text-white hover:bg-white/10 transition-colors"
              >
                <i className="material-icons text-sm">
                  {user.role ? 'logout' : 'login'}
                </i>
                <span className="text-sm font-semibold">
                  {user.role ? 'Logout' : 'Login'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-gradient-to-br from-[#88A5DB] to-[#446496]">
            {/* Header Drawer dengan gradient dan blur */}
            <div className="p-6 bg-gradient-to-r from-[#446496]/30 to-[#88A5DB]/30 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <i className="material-icons text-white text-3xl">
                    {user.role ? 'person' : 'person_outline'}
                  </i>
                </div>
                <div>
                  <p className="text-white text-lg font-semibold drop-shadow-md">
                    {user.name || 'Guest User'}
                  </p>
                  <p className="text-white/80 text-sm drop-shadow-md">
                    {user.email || 'Not logged in'}
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Items */}
            <div className="p-2">
              {[
                { icon: user.role === 'admin' ? 'dashboard' : 'home', 
                  label: user.role === 'admin' ? 'Dashboard' : 'Home',
                  route: user.role === 'admin' ? '/admin/dashboard' : '/' },
                { icon: 'account_circle', label: 'My Profile', route: '/profile' },
                { icon: 'photo_album', label: 'Gallery', route: '/gallery' },
                { icon: 'photo', label: 'Albums', route: '/albums' },
                { icon: 'info', label: 'Info', route: '/info' },
                { icon: 'event', label: 'Agenda', route: '/agenda' },
              ].map((item) => (
                <button
                  key={item.route}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate(item.route);
                  }}
                  className="w-full flex items-center space-x-4 px-4 py-3 text-white
                           hover:bg-white/20 rounded-xl transition-colors"
                >
                  <i className="material-icons">{item.icon}</i>
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <BodyComponent />
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0">
        <div className="relative">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-t-[30px] shadow-lg" />
          <nav className="relative flex justify-around py-2">
            {navItems.map((item, index) => (
              <Link
                key={item.route}
                to={item.route}
                className={`flex flex-col items-center py-2 px-6 ${
                  currentIndex === index
                    ? 'text-[#597FC5]'
                    : 'text-black/70'
                }`}
                onClick={() => onNavItemTapped(index)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#446496] to-[#88A5DB]" 
                       style={{ mixBlendMode: 'screen' }} />
                  <i className="material-icons relative z-10">{item.icon}</i>
                </div>
                <span className={`text-xs mt-1 font-${
                  currentIndex === index ? 'semibold' : 'normal'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BasePage;
