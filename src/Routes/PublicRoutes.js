import React from "react";
import Layout from "../Components/Layout";
import UserListing from "../pages/User/UserListings";
import UserRegister from "../pages/User/UserRegister";
import RoleListing from "../pages/Role/RoleListing";
import RoleRegister from "../pages/Role/RoleRegister";
import { Route, Routes, useNavigate } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserListing />} />
        <Route path="/user-form" element={<UserRegister />} />
        <Route path="/role-listing" element={<RoleListing />} />
        <Route path="/role-form" element={<RoleRegister />} />

        <Route
          path="*"
          element={<h1 style={{ marginLeft: "40%" }}>Page Not Found</h1>}
        />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
