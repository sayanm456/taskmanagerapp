import React, {createContext } from 'react'
import { loginUser } from '../apis/authapi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async () => {
        
    }

    const login = async (credentials) =>{
         const response = await loginUser(credentials);
         if(response.success){
             localStorage.setItem('auth-token', response.token);
             setIsLoggedIn(isLoggedIn);
             setUser(response.user);
             setToken(token);
             setError(null);
         } else {
             setError(response.message);
         }
    }

    const logout = async () => {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
    }


  return (
    <AuthContext.Provider value={{ isLoggedIn: false, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
    
  )
}
