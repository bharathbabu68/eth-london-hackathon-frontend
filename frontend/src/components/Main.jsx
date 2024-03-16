import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'
import NavBar from './NavBar'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main