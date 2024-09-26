import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Add from './Pages/Admin/Categorie/Add.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/cat' element={<Add />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
