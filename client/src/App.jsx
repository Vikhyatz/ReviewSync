import { useState } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Dash2 from './pages/Dash2';
import Logout from './pages/Logout';
import Nav from './pages/Nav';

export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav signedIn={false} />} >
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        <Route path='/' element={<Nav signedIn={true} />} >
          {/* <Route path="/room/:id" element={<RoomPage />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dash2" element={<Dash2 />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
