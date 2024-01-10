import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import Login from './pages/auth/Login';
// import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react'
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProfilePage from './pages/Profile';
import Home from './pages/Home';
import Donors from './pages/Donors/Donors';
import ChangePassword from './pages/auth/ChangePassword';
import LogoutPage from './pages/auth/Logout';
import AuthRoute from './pages/auth/components/AuthRoute';
import AddPost from './pages/AddPost';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path='profile' element={<ProfilePage />} />
              <Route path='profile/addpost' element={<AddPost />} />
              <Route path='changepassword' element={<ChangePassword />} />
              <Route path='logout' element={<LogoutPage />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='register' element={<Register />} />
            <Route path='donors' element={<Donors />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
