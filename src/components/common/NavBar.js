import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-gray-500 text-lg">Logo</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/" className="py-2 px-3 text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/login" className="py-2 px-3 text-gray-700 hover:text-gray-900">Login</Link>
            <Link to="/profile" className="py-2 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
            <Link to="/admin/dashboard" className="py-2 px-3 text-gray-700 hover:text-gray-900">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 