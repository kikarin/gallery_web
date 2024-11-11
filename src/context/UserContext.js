import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    role: null,
    name: null,
    email: null,
    isLoading: true,
  });

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('user_id');

      if (token && userId) {
        const response = await fetch(
          `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/users/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser({
            role: localStorage.getItem('user_role'),
            name: data.name,
            email: data.email,
            isLoading: false,
          });
          localStorage.setItem('user_name', data.name);
          localStorage.setItem('user_email', data.email);
        }
      } else {
        setUser(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUser(prev => ({ ...prev, role }));
    fetchUserProfile();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser({
      role: null,
      name: null,
      email: null,
      isLoading: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);