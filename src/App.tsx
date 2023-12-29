import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import Login from './pages/auth/Login';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );  
}

export default App;
