import React, { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, clearUser } from './storage';

export const UserContext = createContext();

// Thay đổi: Khai báo URL base của MockAPI
const API_BASE = 'https://6551ea355c69a7790329408a.mockapi.io/day';

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

  // Khi load app hoặc sau login, nếu có id => fetch dữ liệu từ API
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
          setUser({ ...defaultUser, ...cleanedRemote });
          await saveUser({ ...defaultUser, ...cleanedRemote });
        } catch (err) {
          console.warn('Không thể fetch user từ API, dùng local cache', err);
          setUser(stored);
        }
      } else if (stored) {
        // Nếu chỉ có local cache nhưng chưa login, giữ local cache
        setUser({ ...defaultUser, ...stored });
      }
    };
    loadUser();
  }, []);

  // Cập nhật user cả local và remote
  const updateUser = async (newData) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    await saveUser(updated);

    // Nếu có id thì đẩy lên MockAPI
    if (updated.id) {
      try {
        await fetch(`${API_BASE}/${updated.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: updated.name,
            avatar: updated.avatar,
            coverPhoto: updated.coverPhoto,
            role: updated.role
            
          }),
        });
      } catch (e) {
        console.warn('Cập nhật API thất bại:', e);
      }
    }
  };

  // Đăng xuất: xoá toàn bộ cache và state
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
