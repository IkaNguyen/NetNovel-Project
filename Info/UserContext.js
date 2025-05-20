import React, { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, clearUser } from './storage';

export const UserContext = createContext();

// Base URL của MockAPI
const API_BASE = 'https://682c340ad29df7a95be5faa8.mockapi.io/netnovel/role';

export const UserProvider = ({ children }) => {
  const defaultUser = {
    name: 'Người dùng',
    account: '',
    avatar: 'https://i.pinimg.com/736x/26/60/e7/2660e74297aebb5db137b71eb3a017f8.jpg',
    coverPhoto: 'https://i.pinimg.com/736x/3c/40/db/3c40db60080ca38939be4bd5fb90bf98.jpg',
    role: 'user',
    id: null,
    savedStories: [],
  };

  const allowedKeys = ['name', 'account', 'avatar', 'coverPhoto', 'role', 'id', 'savedStories'];
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await getUser();
      if (stored && stored.id) {
        try {
          const res = await fetch(`${API_BASE}/${stored.id}`);
          const remote = await res.json();
          const cleanedRemote = Object.keys(remote)
            .filter(key => allowedKeys.includes(key))
            .reduce((obj, key) => ({ ...obj, [key]: remote[key] }), {});
          const finalUser = { ...defaultUser, ...cleanedRemote };
          setUser(finalUser);
          await saveUser(finalUser);
        } catch (err) {
          console.warn('Không thể fetch user từ API, dùng local cache', err);
          setUser(stored);
        }
      } else if (stored) {
        setUser({ ...defaultUser, ...stored });
      }
    };
    loadUser();
  }, []);

  const updateUser = async (newData) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    await saveUser(updated);

    if (updated.id) {
      try {
        const payload = allowedKeys.reduce((obj, key) => {
          obj[key] = updated[key];
          return obj;
        }, {});

        await fetch(`${API_BASE}/${updated.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.warn('Cập nhật API thất bại:', e);
      }
    }
  };

  const logout = async () => {
    setUser(defaultUser);
    await clearUser();
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
