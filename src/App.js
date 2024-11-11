import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import BasePage from './components/base_page';
import HomePage from './components/pages/HomePage';
import GalleryPage from './components/pages/GalleryPage';
import PhotoDetailPage from './components/pages/PhotoDetailPage';
import InfoPage from './components/pages/InfoPage';
import LoginPage from './components/pages/LoginPage';
import UserProfilePage from './components/pages/UserProfilePage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProfilePage from './components/admin/AdminProfilePage';
import AgendaPage from './components/pages/AgendaPage';
import AlbumPage from './components/pages/AlbumPage';
import PictureListPage from './components/pages/PictureListPage';
import PictureDetailPage from './components/pages/PictureDetailPage';

function App() {
  const handleNavChange = (index) => {
    console.log('Nav item clicked', index);
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <BasePage 
                title="Home" 
                BodyComponent={HomePage} 
                currentIndex={0} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <BasePage 
                title="Gallery" 
                BodyComponent={GalleryPage} 
                currentIndex={1} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/photo/:id" 
            element={
              <BasePage 
                title="Photo Detail" 
                BodyComponent={PhotoDetailPage} 
                currentIndex={1} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/info" 
            element={
              <BasePage 
                title="Information" 
                BodyComponent={InfoPage} 
                currentIndex={2} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route 
            path="/agenda" 
            element={
              <BasePage 
                title="Agenda" 
                BodyComponent={AgendaPage} 
                currentIndex={3} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/albums" 
            element={
              <BasePage 
                title="Albums" 
                BodyComponent={AlbumPage} 
                currentIndex={1} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/pictures/:albumId" 
            element={
              <BasePage 
                title="Pictures" 
                BodyComponent={PictureListPage} 
                currentIndex={1} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
          <Route 
            path="/pictures/detail/:id" 
            element={
              <BasePage 
                title="Picture Detail" 
                BodyComponent={PictureDetailPage} 
                currentIndex={1} 
                onNavItemTapped={handleNavChange} 
              />
            } 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
