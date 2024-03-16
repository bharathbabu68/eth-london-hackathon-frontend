import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'
import NavBar from './NavBar'
import Campaigns from '../pages/Campaigns'
import CreateCampaign from '../pages/CreateCampaign'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/create" element={<CreateCampaign />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main