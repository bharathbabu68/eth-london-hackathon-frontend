import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main