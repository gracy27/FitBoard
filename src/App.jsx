import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store'
import LoginPage from './pages/LoginPage'
import Discovery from './pages/Discovery'
import Wardrobe from './pages/Wardrobe'

export default function App() {
  const [likedPhotos, setlikedPhotos] = useState([])

 

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/discover" element={<Discovery likedPhotos={likedPhotos} setlikedPhotos={setlikedPhotos} />} />
          <Route path="/wardrobe" element={<Wardrobe likedPhotos={likedPhotos} setlikedPhotos={setlikedPhotos} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}