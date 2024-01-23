import React, { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Doctor from "../components/Doctor";

const AllRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/doctors" element={user.isAuth ? <Doctor /> : <Login />} />
    </Routes>
  );
};

export default AllRoutes;
