import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'
import NavBar from './NavBar'
import Campaigns from '../pages/Campaigns'
import CreateCampaign from '../pages/CreateCampaign'
import Claim from '../pages/Claim'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/claim/:campaignId" element={<Claim />} />
            <Route path="/admin" element={<CreateCampaign />} />
        </Routes>
    </BrowserRouter>
</>
  )
}

export default Main