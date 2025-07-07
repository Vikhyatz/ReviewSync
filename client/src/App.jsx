import { useState } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Dash2 from './pages/Dash2';
import Nav from './pages/Nav';
import { Room } from './pages/Room';

export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav signedIn={false} />} >
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        <Route path='/' element={<Nav signedIn={true} />} >
          <Route path="/room/:id" element={<Room />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dash2" element={<Dash2 />} />
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
