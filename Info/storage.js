import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu thông tin người dùng
export const saveUser = async (user) => {
  console.log('Saving user:', user);
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

// Lấy thông tin người dùng
export const getUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Xóa thông tin người dùng
export const clearUser = async () => {
  await AsyncStorage.removeItem('user');
};

// Lưu tất cả các truyện
export const saveAllStories = async (stories) => {
  console.log('Saving all stories:', stories);
  const payload = Array.isArray(stories) ? stories : [];
  await AsyncStorage.setItem('allStories', JSON.stringify(payload));
};

// Lấy tất cả các truyện
export const getAllStories = async () => {
  try {
    const json = await AsyncStorage.getItem('allStories');
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error getting all stories:', error);
    return [];
  }
};

// Lưu truyện đã đọc
export const saveReadStories = async (stories) => {
  const payload = Array.isArray(stories) ? stories : [];
  await AsyncStorage.setItem('readStories', JSON.stringify(payload));
};

// Lấy các truyện đã đọc
export const getReadStories = async () => {
  try {
    const json = await AsyncStorage.getItem('readStories');
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error getting read stories:', error);
    return [];
  }
};

// Lưu truyện đã lưu (riêng biệt theo userId)
export const saveSavedStories = async (userId, stories) => {
  const key = `@savedStories_${userId}`;
  if (!Array.isArray(stories)) {
    // nếu không phải mảng, xóa key
    await AsyncStorage.removeItem(key);
    return;
  }
  try {
    await AsyncStorage.setItem(key, JSON.stringify(stories));
  } catch (error) {
    console.error('Error saving saved stories:', error);
  }
};

// Lấy các truyện đã lưu của userId
export const getSavedStories = async (userId) => {
  const key = `@savedStories_${userId}`;
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error getting saved stories:', error);
    return [];
  }
};

// Xóa một truyện đã lưu theo userId và storyId
export const removeSavedStory = async (userId, storyId) => {
  // Lấy danh sách hiện tại
  const savedStories = await getSavedStories(userId);
  // Lọc bỏ story cần xóa
  const updated = savedStories.filter((s) => s.id !== storyId);
  // Lưu lại
  await saveSavedStories(userId, updated);
};

// Xóa tất cả truyện đã lưu của userId
export const clearSavedStories = async (userId) => {
  const key = `@savedStories_${userId}`;
  await AsyncStorage.removeItem(key);
};

// Xóa tất cả truyện đã đọc
export const clearReadStories = async () => {
  await AsyncStorage.removeItem('readStories');
};
