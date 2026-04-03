import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store'
import LoginPage from './pages/LoginPage'
import Discovery from './pages/Discovery'
import Wardrobe from './pages/Wardrobe'

export default function App() {
  const [savedPhotos, setSavedPhotos] = useState([])

  // Load photos from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('savedPhotos')
    if (savedData) {
      try {
        setSavedPhotos(JSON.parse(savedData))
        console.log('Photos loaded from localStorage')
      } catch (error) {
        console.error('Error parsing saved photos:', error)
      }
    }
  }, [])

  // Save photos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos))
    console.log('Photos saved to localStorage')
  }, [savedPhotos])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/discover" element={<Discovery savedPhotos={savedPhotos} setSavedPhotos={setSavedPhotos} />} />
          <Route path="/wardrobe" element={<Wardrobe savedPhotos={savedPhotos} setSavedPhotos={setSavedPhotos} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}