import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import Login from './pages/auth/Login';
// import Home from './pages/Home';
import MyProfilePage from './pages/myProfile';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route index element={<Home/>}/> */}
          <Route index element={<MyProfilePage/>}/>
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
