import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LogOut(props) {
  //   const navigate = useNavigate();
  localStorage.removeItem("member");
  //   navigate("/");
  return <Navigate to="/" />;
  //   메인페이지로 가고 싶으면 Navigate 컴포넌트 사용 useNavigate 가 아님
}

export default LogOut;
