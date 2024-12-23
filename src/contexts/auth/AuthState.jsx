import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { GetallUsers, LoginUser, RegisterUser } from '../../apis/authApi';

const AuthState = (props) => {

  // For user registration or signup
  const credentialInitial = {};
  const userDetailsInitial = {};
  const [credentials, setCredentials] = useState(credentialInitial);
  const [userDetails, setUserDetails] = useState(userDetailsInitial);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null)


  const signupUser = async ({ name, email, password, role }) => {
    // logic for register user or sign up process
    try {
      const credentialsJson = await RegisterUser({ name, email, password, role });
      if (credentialsJson.success) {
        setCredentials(credentialsJson)
        setIsAuthenticated(!isAuthenticated)
        return credentialsJson;
      }
      else {
        throw new Error(credentialsJson.message)
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const loginUser = async ({ email, password, role }) => {
    // logic for login to user access
    try {
      const userDetailsJson = await LoginUser({ email, password, role });
      if (userDetailsJson.success) {
        setUserDetails(userDetailsJson);
        setIsAuthenticated(!isAuthenticated);
        return userDetailsJson;
      }
      else {
        setUserDetails(userDetails);
        setIsAuthenticated(isAuthenticated);
      }

    } catch (error) {
      setError(error.message)
    }
  }

  // For user logout
  const logOut = () => {
    localStorage.removeItem('authtoken');
    setUserDetails(userDetailsInitial);
  }

  // Get all users for admin
  const getUsers = async () => {
    try {
      const usersJson = await GetallUsers();
      if(usersJson.success){
        setUsers(usersJson.users);
      }
      else {
        throw new Error(usersJson.message);
      }
    } catch (error) {
      setError(error.message);
      setUsers(users);

    }
    // const usersJson = await GetallUsers();
    // setUsers(usersJson);
    // console.log(usersJson);
  }

  return (
    <AuthContext.Provider value={{ credentials, userDetails, users, error, signupUser, loginUser, logOut, getUsers }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState