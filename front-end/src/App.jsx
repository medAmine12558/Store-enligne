import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slideshow from './Pages/User/Components/HomePage/SlideShow'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Slideshow />
    </>
  )
}

export default App
