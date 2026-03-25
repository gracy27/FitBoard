import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import LoginPage from './pages/LoginPage';
import Discovery from './pages/Discovery';
import Wardrobe from './pages/Wardrobe';
export default function App()
{
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage /> } />
          <Route path="/discover" element={<Discovery /> } />
          <Route path="/wardrobe" element={<Wardrobe /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}