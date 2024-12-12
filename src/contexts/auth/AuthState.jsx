import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { GetallUsers, LoginUser, RegisterUser } from '../../apis/authApi';

const AuthState = (props) => {

  // For user registration or signup
  const credentialInitial = {};
  const userdetailsInitial = {};
  const [credentials, setCredentials] = useState(credentialInitial);
  const [userdetails, setUserdetails] = useState(userdetailsInitial);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

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
  }

  // For user logout
  const logOut = () => {
    localStorage.removeItem('authtoken');
    setUserdetails(userdetailsInitial);

  }

  // Get all users for admin
  const getUsers = async () => {
    const users = await GetallUsers();
    setUsers(users);
  }

  return (
    <AuthContext.Provider value={{ credentials, userdetails, signupUser, loginUser, logOut, getUsers }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState