import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WithNavigation = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Component navigate={navigate} location={location} {...props} />;
  };
  return WrappedComponent;
};
export default WithNavigation;