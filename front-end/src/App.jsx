import { useState } from 'react'
import './App.css'
import Slideshow from './Pages/User/Components/HomePage/SlideShow'
import Footer from './Pages/User/Components/HomePage/Footer'
import ProductCard from './Pages/User/Components/Product'
import ProductList from './Pages/User/Components/ProductList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Slideshow />
      <ProductList />
      <Footer />
    </>
  )
}

export default App
