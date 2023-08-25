import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Register from './components/Register'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>chimichanguys</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  )
}

export default App
