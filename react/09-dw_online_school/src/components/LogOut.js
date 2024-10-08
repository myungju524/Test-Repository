import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  localStorage.removeItem("member");
  navigate("/");
  return null;
}

export default Logout;
