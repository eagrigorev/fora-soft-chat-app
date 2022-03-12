import React from "react";
import { Routes, Route } from "react-router-dom";
import io from 'socket.io-client';

import { Login } from './login';
import { Room } from './room';

const socket = io.connect('/');

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Login socket={socket} />} />
      <Route path='/messaging/:room/:name' element={<Room />} />
    </Routes>
  );
};