import { create } from 'zustand';

const useAuthStore = create((set) => {

  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  return {
    userData: userData ? userData : null,
    setUserData: (newUserData) => set({ userData: newUserData }),
  }

});

export default useAuthStore;