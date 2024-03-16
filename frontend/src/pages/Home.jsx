import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Home = () => {
  return (
    <>
    <Container style={{minHeight:"100vh", backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)", fontFamily: "Roboto"}} fluid>
        <h1 style={{fontWeight:"light", paddingTop:"8%", fontSize:"5rem"}}>CryptoRelief 🛟</h1>
        <h5 style={{fontWeight:"normal", fontSize:"1.5rem"}}>Your Platform for on-chain distribution and claim of relief aid</h5>
        <Row style={{textAlign:"center", fontSize:"1.2rem"}}>
            <Col style={{border:"1px solid black", borderRadius:"10px", padding:"1%", margin:"1%", width:"20%", marginLeft:"17%"}} md={4}>
            <i class="fa-solid fa-hand-holding-dollar fa-xl"></i>
                <p style={{marginTop:"3%"}}>Receive aid instantly to your wallet as USDC</p>
            </Col>
            <Col style={{border:"1px solid black", borderRadius:"10px", padding:"1%", margin:"1%", width:"20%"}} md={4}>
                <i class="fa-solid fa-gas-pump fa-xl"></i>
                <p style={{marginTop:"3%"}}>No gas fees, powered by Circle Gas Station</p>
                
            </Col>
            <Col style={{border:"1px solid black", borderRadius:"10px", padding:"1%", margin:"1%", width:"20%"}} md={4}>
            <i class="fa-solid fa-user-large fa-xl"></i>
                <p style={{marginTop:"3%"}}>Receive your SBT, with Sybil guarantees using Worldcoin</p>
                
            </Col>

        </Row>
        <Button onClick={()=>{
            window.location.href = '/campaigns'
        }} variant="success" size="lg">
          Claim Relief Aid
        </Button>
    </Container>
    </>
  )
}

export default Home