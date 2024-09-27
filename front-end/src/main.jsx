import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Add from './Pages/Admin/Categorie/Add.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
