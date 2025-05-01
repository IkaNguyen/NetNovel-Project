
import AsyncStorage from '@react-native-async-storage/async-storage';
  // Lưu thông tin người dùng
  export const saveUser = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  // Lấy thông tin người dùng
  export const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  
// Lưu tất cả các truyện vào AsyncStorage
export const saveAllStories = async (stories) => {
    console.log("Saving stories to AsyncStorage:", stories);
  await AsyncStorage.setItem('allStories', JSON.stringify(stories));
};

// Lấy tất cả các truyện từ AsyncStorage
export const getAllStories = async () => {
  
  const stories = await AsyncStorage.getItem('allStories');
  return stories ? JSON.parse(stories) : [];  // Nếu không có truyện, trả về mảng rỗng
};

// Lưu truyện đã đọc
export const saveReadStories = async (stories) => {
  await AsyncStorage.setItem('readStories', JSON.stringify(stories));
};

// Lấy các truyện đã đọc
export const getReadStories = async () => {
  const stories = await AsyncStorage.getItem('readStories');
  return stories ? JSON.parse(stories) : [];
};

// Lưu truyện đã lưu
export const saveSavedStories = async (stories) => {
  await AsyncStorage.setItem('savedStories', JSON.stringify(stories));
};

// Lấy các truyện đã lưu
export const getSavedStories = async () => {
  const stories = await AsyncStorage.getItem('savedStories');
  return stories ? JSON.parse(stories) : [];
};

// Xóa một truyện khỏi danh sách truyện đã lưu
export const removeSavedStory = async (storyId) => {
  const savedStories = await getSavedStories(); // Lấy danh sách truyện đã lưu
  const updatedStories = savedStories.filter(story => story.id !== storyId); // Lọc bỏ truyện cần xóa
  await saveSavedStories(updatedStories); // Lưu lại danh sách mới
};

// Xóa tất cả các truyện đã lưu
export const clearSavedStories = async () => {
  await AsyncStorage.removeItem('savedStories'); // Xóa danh sách truyện đã lưu khỏi AsyncStorage
};

// Xóa tất cả các truyện đã đọc
export const clearReadStories = async () => {
  await AsyncStorage.removeItem('readStories'); // Xóa danh sách truyện đã đọc khỏi AsyncStorage
};
