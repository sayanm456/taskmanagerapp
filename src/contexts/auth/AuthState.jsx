import { useState } from 'react'
import AuthContext from './AuthContext'
import PropTypes from "prop-types";
import { GetallUsers, LoginUser, RegisterUser } from '../../apis/authApi';

const AuthState = (props) => {

  // For user registration or signup
  const credentialInitial = {};
  const userDetailsInitial = {};
  const [user, setUser] = useState({});
  const [role, setRole] = useState('')
  const [credentials, setCredentials] = useState(credentialInitial);
  const [userDetails, setUserDetails] = useState(userDetailsInitial);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);


  const signupUser = async ({ name, email, password, role }) => {
    // logic for register user or sign up process
    try {
      const credentialsJson = await RegisterUser({ name, email, password, role });
      if (credentialsJson.success) {
        let userData = credentialsJson.data;
        setCredentials(credentialsJson);
        setUser(userData);
        setRole(userData.role);
        // setIsAuthenticated(true);
        console.log(userData, role, credentialsJson);
        return credentialsJson;
      }
      else {
        throw new Error(credentialsJson.message);
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
        let userData = userDetailsJson.data.user;
        setUserDetails(userDetailsJson);
        setUser(userData);
        setRole(userData.role);
        console.log(userDetails);
        setIsAuthenticated(userDetailsJson.success);
        return userDetailsJson;
      }
      else {
        setUserDetails(userDetails);
        // setIsAuthenticated(!isAuthenticated);
      }

    } catch (error) {
      setError(error.message)
    }
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
  }

  return (
    <AuthContext.Provider value={{ user, role, credentials, userDetails, isAuthenticated, users, error, signupUser, loginUser, getUsers }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthState