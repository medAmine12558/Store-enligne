import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Add from './Pages/Admin/Categorie/Add.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AddProd from './Pages/Admin/Produit/AddProd.jsx'

import { UpdateProd } from './Pages/Admin/Produit/UpdateProd.jsx'

import App from './App.jsx'
import {Example} from './test.jsx'
import Homepage from './Pages/Admin/Produit/Homepage.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/admin'>
      <Route path='cat' element={<Add />} />
      <Route path='addprod' element={<AddProd />} />
      <Route path='updateprod/:id' element={<UpdateProd />} />
      <Route path='homepage' element={<Homepage />}></Route>
      </Route>
    

    

    
    
    <Route path='/user/home' element={<App />} />
    <Route path='/a' element={<Example />}></Route>

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)