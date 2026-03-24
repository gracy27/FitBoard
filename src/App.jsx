import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Discovery from './pages/Discovery';

export default function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage /> } />
        <Route path="/discover" element={<Discovery /> } />
      </Routes>
    </BrowserRouter>


  )
}