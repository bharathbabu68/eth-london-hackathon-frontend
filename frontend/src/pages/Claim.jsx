import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Claim = () => {
    const { campaignId } = useParams();
    
    // State variables to store user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    // Dummy campaign details (replace with actual data retrieval logic)
    const campaignDetails = {
        title: 'Support for Flood Victims',
        description: 'Providing aid to families affected by recent flooding in the region.',
        totalFundAmount: 50000,
        reliefAidPerPerson: 100,
        fundingOrganization: 'Red Cross',
        fundingWalletAddress: '0x5082f249cdb2f2c1ee035e4f423c46ea2dab3ab1',
        currentFundBalance: 25000,
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Perform form submission logic here, e.g., send data to backend
        const formData = {
            name,
            email,
            phoneNumber,
            address,
            walletAddress
        };

        console.log('Form data:', formData);

        // Reset form fields after submission
        setName('');
        setEmail('');
        setPhoneNumber('');
        setAddress('');
        setWalletAddress('');
    };

    return (
        <Container style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', fontFamily: 'Roboto'}} fluid>
            <Row style={{paddingTop:"3%"}} className="justify-content-center">
                <Col md={8}>
                    <div>
                        <h2>Claim Relief Funds</h2>
                        <p>You are claiming relief funds for the campaign: {campaignDetails.title}</p>
                        <p><strong>Campaign Description:</strong> {campaignDetails.description}</p>
                        <p><strong>Total Fund Amount:</strong> {campaignDetails.totalFundAmount}</p>
                        <p><strong>Relief Aid Per Person:</strong> {campaignDetails.reliefAidPerPerson}</p>
                        <p><strong>Funding Organization:</strong> {campaignDetails.fundingOrganization}</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    placeholder="Enter phone number" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Enter your address" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formWalletAddress">
                                <Form.Label>Wallet Address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your wallet address" 
                                    value={walletAddress} 
                                    onChange={(e) => setWalletAddress(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Button style={{marginTop:"2%"}} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Claim;
