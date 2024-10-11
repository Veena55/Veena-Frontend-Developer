import { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchBox from './components/SearchBox'
import Home from './pages/Home'
import Footer from './components/Footer'
import FoodList from './components/FoodList'
import Sort from './components/Sort'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="search" element={<SearchBox />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App