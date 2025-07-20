import { useState } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import Nav from './pages/Nav';
import { Room } from './pages/Room';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const [roomData, setRoomData] = useState(null)

  return (

    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Nav signedIn={false} />} >
          <Route index element={<Home />}/>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        <Route path='/' element={<Nav signedIn={true} roomData={roomData} />} >
          <Route path="/room/:id" element={<Room setRoomData={setRoomData} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
