import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Discovery from './pages/Discovery'
import Wardrobe from './pages/Wardrobe'
import Moodboard from './pages/Moodboard'
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/discover" element={<Discovery />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/moodboard" element={<Moodboard />} />
      </Routes>
    </BrowserRouter>
  )
}