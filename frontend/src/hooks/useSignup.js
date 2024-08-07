import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../stores/authStore';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const setUserData = useAuthStore((state) => state.setUserData)

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const user = {
        "email": email,
        "password": password
    }

    try {
        const response = await axios.post('http://localhost:4000/api/user/signup', user)
        localStorage.setItem('user', JSON.stringify(response.data)) // {email: ... token: ...}
        setUserData(response.data.token)
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        setError(error.response.data.error)
    }

  }

  return {signup, isLoading, error}
}