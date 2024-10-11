import { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchBox from './components/SearchBox'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/search" element={<SearchBox />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
