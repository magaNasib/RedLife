import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
