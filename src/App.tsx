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

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='login' element={<Login />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
