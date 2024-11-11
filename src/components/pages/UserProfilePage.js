import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/users/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setUserData(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');

    try {
      const response = await axios.put(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/users/${userId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setUserData(response.data);
      setIsEditing(false);
      // You might want to add a toast notification here
    } catch (error) {
      console.error('Error updating profile:', error);
      // You might want to add an error toast notification here
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const ProfileAvatar = () => (
    <div className="profile-avatar">
      <div className="avatar-circle">
        <i className="fas fa-user"></i>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="profile-view">
      <ProfileAvatar />
      <div className="profile-detail">
        <h3>Name</h3>
        <div className="detail-box">{userData.name || 'N/A'}</div>
      </div>
      <div className="profile-detail">
        <h3>Email</h3>
        <div className="detail-box">{userData.email || 'N/A'}</div>
      </div>
      <button 
        className="edit-button"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    </div>
  );

  const EditForm = () => (
    <div className="edit-form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-group">
        <button 
          className="save-button"
          onClick={handleUpdateProfile}
        >
          Save Changes
        </button>
        <button 
          className="cancel-button"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <header className="profile-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>User Profile</h1>
        {!isEditing && (
          <button 
            className="edit-icon-button"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
      </header>
      <div className="profile-content">
        {isEditing ? <EditForm /> : <ProfileView />}
      </div>
    </div>
  );
};

export default UserProfilePage; 