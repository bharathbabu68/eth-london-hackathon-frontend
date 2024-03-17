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
    const [claimResponse, setClaimResponse] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null); // State variable to store transaction status

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Perform form submission logic here, e.g., send data to backend
        const formData = {
            campaignTitle: campaignDetails.campaignTitle,
            campaignDescription: campaignDetails.campaignDescription,
            fundDispensePerIndividual: campaignDetails.fundDispensePerIndividual,
            campaignId: campaignId,
            name: name,
            email: email,
            phone: phoneNumber,
            address: address,
            walletAddress: walletAddress,
            walletId: campaignDetails.walletId,
            currentFundBalance: campaignDetails.currentFundBalance
        };

        try {
            const response = await fetch('http://localhost:4000/api/claimFunds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to claim funds');
            }

            const responseData = await response.json();
            console.log('Claim funds response:', responseData);
            
            // Set the claim response
            setClaimResponse(responseData);

            // Reset form fields after successful submission
            setName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');
            setWalletAddress('');

            // Display success message to the user
            alert('Funds claimed successfully! Transaction initiated.');
        } catch (error) {
            console.error('Error claiming funds:', error);
            // Display error message to the user
            alert('Failed to claim funds. Please try again later.');
        }
    };

    // Function to track the transaction ID
    const trackTransaction = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/trackTransaction/${claimResponse.id}`);
            const data = await response.json();
            console.log('Transaction data:', data);
            // Set the transaction status
            setTransactionStatus(data);
        } catch (error) {
            console.error('Error tracking transaction:', error);
            // Display error message to the user
            alert('Failed to track transaction. Please try again later.');
        }
    };

    return (
        <Container style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Roboto' }} fluid>
            <Row style={{ paddingTop: "3%" }} className="justify-content-center">
                <Col md={8}>
                    <div style={{ marginBottom: "20px" }}>
                        <h2>Claim Relief Funds</h2>
                        {campaignDetails && (
                            <>
                                <p>You are claiming relief funds for the campaign: <strong>{campaignDetails.campaignTitle}</strong></p>
                                <p><strong>Campaign Description:</strong> {campaignDetails.campaignDescription}</p>
                                <p><strong>Relief Aid Per Person:</strong> {campaignDetails.fundDispensePerIndividual}</p>
                                <p><strong>Funding Organization:</strong> {campaignDetails.fundingOrganization}</p>
                                <p><strong>Funding Wallet Address:</strong> <a href={`https://mumbai.polygonscan.com/address/${campaignDetails.fundingWalletAddress}`} target="_blank" rel="noopener noreferrer">{campaignDetails.fundingWalletAddress}</a></p>
                            </>
                        )}
                    </div>
                    {claimResponse && (
                        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '20px' }}>
                            <p>This is the claim funds response - <strong>{claimResponse.id}</strong></p>
                            <p>Transaction has been initiated.</p>
                            <Button onClick={trackTransaction} variant="info">Track Transaction</Button>
                        </div>
                    )}
                    {transactionStatus && transactionStatus.transaction && (
                        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '20px' }}>
                            <h5>Transaction Details</h5>
                            <p><strong>Transaction ID:</strong> {transactionStatus.transaction.id}</p>
                            <p><strong>Blockchain:</strong> {transactionStatus.transaction.blockchain}</p>
                            <p><strong>Source Address:</strong> {transactionStatus.transaction.sourceAddress}</p>
                            <p><strong>Destination Address:</strong> {transactionStatus.transaction.destinationAddress}</p>
                            <p><strong>Transaction Type:</strong> {transactionStatus.transaction.transactionType}</p>
                            <p><strong>State:</strong> {transactionStatus.transaction.state}</p>
                            <p><strong>Transaction Hash:</strong> {transactionStatus.transaction.userOpHash}</p>
                            <p><strong>Operation:</strong> {transactionStatus.transaction.operation}</p>
                            <p><strong>Fee Level:</strong> {transactionStatus.transaction.feeLevel}</p>
                        </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formAddress">
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
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formWalletAddress">
                            <Form.Label>Wallet Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your wallet address"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button style={{ marginTop: "2%", marginBottom: "2%" }} variant="primary" type="submit">
                            Claim Funds
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Claim;
