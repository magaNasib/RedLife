import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "../pages/Home";
import PageLayout from "../components/PageLayout";
import ProfilePage from "../pages/Profile";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";
import Donors from "../pages/Donors/Donors";
import Blogs from "../features/BlogsFeature";
import BloodRequest from "../pages/BloodRequest";
import AuthRoute from "../pages/auth/components/AuthRoute";
import ChangePassword from "../pages/auth/ChangePassword";
import Logout from "../pages/auth/Logout";
import DonorDetails from "../pages/Donors/DonorDetails";
function Router() {
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/profile/changepassword"
                element={<ChangePassword />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/donor-details/:id" element={<DonorDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/bloodRequest" element={<BloodRequest />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default Router;
