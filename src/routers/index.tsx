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
import AuthRoute from "../pages/auth/components/AuthRoute";
import ChangePassword from "../pages/auth/ChangePassword";
import Logout from "../pages/auth/Logout";
import InformationDetail from "../pages/InformationDetail";
import Messages from "../pages/Messages/Messages";
import Post from "../pages/Post";
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
              <Route path="/profile/changepassword" element={<ChangePassword />} />

            </Route>
            <Route path="/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/infoDetails" element={<InformationDetail />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default Router;
