import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";
import PropTypes from "prop-types";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { credentials, userDetails } = useContext(AuthContext);
  const userRole = credentials?.role || userDetails?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect unauthorized users to the home page or a 403 page
    return <Navigate to="/" replace />;
  }

  return children;
};

RoleBasedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

export default RoleBasedRoute;
