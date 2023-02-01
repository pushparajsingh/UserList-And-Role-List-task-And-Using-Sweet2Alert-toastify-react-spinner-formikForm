import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./Component/Header";
import UserListing from "./Component/User/UserListings";
import UserRegister from "./Component/User/UserRegister";
import RoleListing from "./Component/Role/RoleListing";
import RoleRegister from "./Component/Role/RoleRegister";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
