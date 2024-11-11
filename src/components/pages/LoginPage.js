import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const getCsrfTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('XSRF-TOKEN=')) {
      return cookie.substring('XSRF-TOKEN='.length);
    }
  }
  return null;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Ambil CSRF token
      await axios.get('https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/sanctum/csrf-cookie', {
        withCredentials: true
      });

      const response = await axios({
        method: 'post', // Pastikan method POST
        url: 'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/login',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: {
          email: formData.email,
          password: formData.password
        },
        withCredentials: true
      });

      const data = response.data;
      console.log('Login response:', data);

      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('token_type', data.token_type);
      localStorage.setItem('user_role', data.user.role);
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_email', data.user.email);
      
      setUser({
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        isLoading: false,
      });

      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error details:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log('Sending register request with:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const response = await axios.post(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      const data = response.data;
      console.log('Register response:', data);

      setIsLoginMode(true);
      setFormData({ name: '', email: '', password: '' });
      setErrorMessage('Registration successful! Please login.');
    } catch (error) {
      console.error('Register error details:', error);
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.match(/^[^@]+@[^@]+\.[^@]+/)) {
      setErrorMessage('Please enter a valid email');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }
    if (!isLoginMode && !formData.name) {
      setErrorMessage('Please enter your name');
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-white hover:text-gray-200 transition-colors"
      >
        <i className="material-icons">arrow_back</i>
      </button>

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <div className="w-40 h-40 mb-8 relative animate-float">
          <img
            src="/images/7309682.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Form Container */}
        <div 
          className={`w-full max-w-md bg-white rounded-3xl shadow-xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02]
                    ${isLoginMode ? 'animate-slide-up' : 'animate-slide-down'}`}
        >
          <h2 
            className={`text-2xl font-bold text-primary text-center mb-8
                      transform transition-all duration-500
                      ${isLoginMode ? 'animate-fade-in' : 'animate-fade-in'}`}
          >
            {isLoginMode ? 'Login Account' : 'Create Your Account'}
          </h2>

          <form 
            onSubmit={isLoginMode ? handleLogin : handleRegister} 
            className={`space-y-6 transform transition-all duration-500
                      ${isLoginMode ? 'animate-slide-left' : 'animate-slide-right'}`}
          >
            {!isLoginMode && (
              <div>
                <div className="relative">
                  <i className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </i>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full
                             focus:outline-none focus:ring-2 focus:ring-primary/50
                             text-primary-dark placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <i className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  email
                </i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full
                           focus:outline-none focus:ring-2 focus:ring-primary/50
                           text-primary-dark placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <i className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  lock
                </i>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full
                           focus:outline-none focus:ring-2 focus:ring-primary/50
                           text-primary-dark placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="material-icons">
                    {isPasswordVisible ? 'visibility' : 'visibility_off'}
                  </i>
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-primary text-white rounded-full hover:bg-primary-dark
                       transform transition-all duration-300 hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"/>
              ) : (
                isLoginMode ? 'Login' : 'Register'
              )}
            </button>
          </form>

          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMessage('');
              setFormData({ name: '', email: '', password: '' });
            }}
            className="mt-6 text-primary hover:text-primary-dark text-center w-full
                     transform transition-all duration-300 hover:scale-105"
          >
            {isLoginMode
              ? "Don't have an account? Register here"
              : "Already have an account? Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 