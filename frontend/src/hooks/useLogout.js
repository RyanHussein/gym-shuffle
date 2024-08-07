import useAuthStore from '../stores/authStore';

export const useLogout = () => {
    const setUserData = useAuthStore((state) => state.setUserData)

    const logout = () => {
        localStorage.removeItem('user')  
        setUserData (null)
    }

    return {logout}
};