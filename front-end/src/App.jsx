import { useState } from 'react'
import './App.css'
import Slideshow from './Pages/User/Components/HomePage/SlideShow'
import Footer from './Pages/User/Components/HomePage/Footer'
import Button from '@mui/material/Button';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Slideshow />
      <Footer />
    </>
  )
}

export default App
