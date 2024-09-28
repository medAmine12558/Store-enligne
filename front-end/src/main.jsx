import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Add from './Pages/Admin/Categorie/Add.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AddProd from './Pages/Admin/Produit/AddProd.jsx'

import { UpdateProd } from './Pages/Admin/Produit/UpdateProd.jsx'


import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/admin/cat' element={<Add />} />
    <Route path='/admin/addprod' element={<AddProd />} />

    <Route path='/admin/updateprod/:id' element={<UpdateProd />} />
    
    <Route path='/user/home' element={<App />} />

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)