import React, { createContext, useState, useEffect } from 'react';
import { getUser, saveUser } from './storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Người dùng', avatar: null });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  const updateUser = async (newUser) => {
    setUser(newUser);
    await saveUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
