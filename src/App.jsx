import { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store'
import LoginPage from './pages/LoginPage'
import Discovery from './pages/Discovery'
import Wardrobe from './pages/Wardrobe'

export default function App() {
  const [savedPhotos, setSavedPhotos] = useState([])

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