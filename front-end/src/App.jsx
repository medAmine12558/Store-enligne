//import { useState } from 'react'
import './App.css'

import Home from './Pages/User/Pages/Home';
import CategoryPage from './Pages/User/Pages/CategoryPage'
import { Routes, Route} from 'react-router-dom';
import Layout from './Pages/User/Pages/Layout';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path='*' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="category/:id/:catlib" element={<CategoryPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
