import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import PropTypes from "prop-types";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const {user, role } = useContext(AuthContext);
  console.log(role); //for debugging
  // console.log(JSON.stringify(JSON.parse(user))); //for debugging
  // console.log(JSON.parse(JSON.stringify(user)), role); //for debugging

  if (!user || !allowedRoles.includes(role)) {
    // Redirect unauthorized users to the home page or a 403 page
    return <Navigate to="/login" replace />;
  }
  return children;
};

RoleBasedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

export default RoleBasedRoute;