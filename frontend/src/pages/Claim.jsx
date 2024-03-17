import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Claim = () => {
    const { campaignId } = useParams();
    
    // State variables to store user data and campaign details
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [campaignDetails, setCampaignDetails] = useState(null);

    // Fetch campaign details by ID
    useEffect(() => {
        async function getCampaignDetails() {
            try {
                const response = await fetch(`http://localhost:4000/api/getReliefCampaignById/${campaignId}`);
                const data = await response.json();
                console.log(data);
                if (data && data.length > 0) {
                    const campaign = data[0]; // Selecting the first campaign from the array
                    setCampaignDetails(campaign);
                }
            } catch (error) {
                console.error("Error fetching campaign details:", error);
            }
        }
        getCampaignDetails();
    }, [campaignId]);

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
                        {campaignDetails && (
                            <>
                                <p>You are claiming relief funds for the campaign: <strong>{campaignDetails.campaignTitle}</strong></p>
                                <p><strong>Campaign Description:</strong> {campaignDetails.campaignDescription}</p>
                                <p><strong>Total Fund Amount:</strong> {campaignDetails.allocatedFundAmount}</p>
                                <p><strong>Relief Aid Per Person:</strong> {campaignDetails.fundDispensePerIndividual}</p>
                                <p><strong>Funding Organization:</strong> {campaignDetails.fundingOrganization}</p>
                                <p><strong>Funding Wallet Address:</strong> {campaignDetails.fundingWalletAddress}</p>
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
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Claim;
