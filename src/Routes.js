import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AgendaPage from './pages/AgendaPage';
import AlbumPage from './pages/AlbumPage';
import GalleryPage from './pages/GalleryPage';
import InfoPage from './pages/InfoPage';
import PhotoDetailPage from './pages/photo/PhotoDetailPage';
import PictureDetailPage from './pages/picture/PictureDetailPage';
import PictureListPage from './pages/picture/PictureListPage';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import AdminProfilePage from './admin/AdminProfilePage';
import AdminAgendaPage from './admin/agenda/AdminAgendaPage';
import AdminAgendaForm from './admin/agenda/AdminAgendaForm';
import AdminAlbumPage from './admin/album/AdminAlbumPage';
import AdminAlbumForm from './admin/album/AdminAlbumForm';
import AdminGalleryPage from './admin/gallery/AdminGalleryPage';
import AdminGalleryForm from './admin/gallery/AdminGalleryForm';
import AdminInfoPage from './admin/info/AdminInfoPage';
import AdminInfoForm from './admin/info/AdminInfoForm';
import AdminPhotoPage from './admin/photo/AdminPhotoPage';
import AdminPhotoForm from './admin/photo/AdminPhotoForm';
import AdminPicturePage from './admin/picture/AdminPicturePage';
import AdminPictureForm from './admin/picture/AdminPictureForm';
import AdminUserPage from './admin/AdminUserPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/photo/:id" element={<PhotoDetailPage />} />
        <Route path="/picture/:id" element={<PictureDetailPage />} />
        <Route path="/pictures" element={<PictureListPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/admin/agenda" element={<AdminAgendaPage />} />
        <Route path="/admin/agenda/form" element={<AdminAgendaForm />} />
        <Route path="/admin/agenda/form/:id" element={<AdminAgendaForm />} />
        <Route path="/admin/album" element={<AdminAlbumPage />} />
        <Route path="/admin/album/form" element={<AdminAlbumForm />} />
        <Route path="/admin/album/form/:id" element={<AdminAlbumForm />} />
        <Route path="/admin/gallery" element={<AdminGalleryPage />} />
        <Route path="/admin/gallery/form" element={<AdminGalleryForm />} />
        <Route path="/admin/gallery/form/:id" element={<AdminGalleryForm />} />
        <Route path="/admin/info" element={<AdminInfoPage />} />
        <Route path="/admin/info/form" element={<AdminInfoForm />} />
        <Route path="/admin/info/form/:id" element={<AdminInfoForm />} />
        <Route path="/admin/photo" element={<AdminPhotoPage />} />
        <Route path="/admin/photo/form" element={<AdminPhotoForm />} />
        <Route path="/admin/photo/form/:id" element={<AdminPhotoForm />} />
        <Route path="/admin/picture" element={<AdminPicturePage />} />
        <Route path="/admin/picture/form" element={<AdminPictureForm />} />
        <Route path="/admin/picture/form/:id" element={<AdminPictureForm />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 