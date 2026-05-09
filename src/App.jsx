import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Discovery from './pages/Discovery'
import Wardrobe from './pages/Wardrobe'
import Moodboard from './pages/Moodboard'
import { ToastContainer, toast } from 'react-toastify';
export default function App() {
  const [likedPhotos, setlikedPhotos] = useState([])
  const [moodboards, setMoodboards] = useState([]);


  return (
    

      <BrowserRouter>
        <ToastContainer position="top-right"
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
          <Route path="/discover" element={<Discovery likedPhotos={likedPhotos} setlikedPhotos={setlikedPhotos} />} />
          <Route path="/wardrobe" element={<Wardrobe likedPhotos={likedPhotos} setlikedPhotos={setlikedPhotos} moodboards={moodboards} setMoodboards={setMoodboards} />} />
          <Route path="/moodboard" element={<Moodboard moodboards={moodboards} setMoodboards={setMoodboards} />} />
        </Routes>
      </BrowserRouter>
    
  )
}