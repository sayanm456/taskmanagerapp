import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { LoginUser, RegisterUser } from '../../apis/authApi';

const AuthState = (props) => {

  // For user registration or signup
  const credentialInitial = {};
  const userdetailsInitial = {};
  const [credentials, setCredentials] = useState(credentialInitial);
  const [userdetails, setUserdetails] = useState(userdetailsInitial);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signupUser = async ({ name, email, password, role }) => {
    // logic for register user or sign up process
    const credentialJson = await RegisterUser({ name, email, password, role });
    setCredentials(credentialJson);
    setIsAuthenticated(!isAuthenticated);
    return credentialJson;
  }

  const loginUser = async ({ email, password, role }) => {
    // logic for login to user access
    const userdetailsJson = await LoginUser({ email, password, role });
    setUserdetails(userdetailsJson);
    setIsAuthenticated(!isAuthenticated);
    return userdetailsJson;
  }

  // For user logout
  const logOut = () => {
    localStorage.removeItem('authtoken');
    setUserdetails(userdetailsInitial);

  }


  return (
    <AuthContext.Provider value={{ credentials, userdetails, signupUser, loginUser, logOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState