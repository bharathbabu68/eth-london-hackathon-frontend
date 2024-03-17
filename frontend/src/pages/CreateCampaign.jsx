import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CreateCampaign = () => {
    const [campaignTitle, setCampaignTitle] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');
    const [allocatedFundAmount, setAllocatedFundAmount] = useState('');
    const [fundDispensePerIndividual, setFundDispensePerIndividual] = useState('');
    const [fundingOrganization, setFundingOrganization] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/createReliefCampaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    campaignTitle,
                    campaignDescription,
                    allocatedFundAmount,
                    fundDispensePerIndividual,
                    fundingOrganization
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create relief campaign');
            }

            // Reset form fields after successful submission
            setCampaignTitle('');
            setCampaignDescription('');
            setAllocatedFundAmount('');
            setFundDispensePerIndividual('');
            setFundingOrganization('');

            // Display success message to the user
            alert('Relief campaign created successfully!');
        } catch (error) {
            console.error('Error creating relief campaign:', error);
            // Display error message to the user
            alert('Failed to create relief campaign. Please try again later.');
        }
    };

    return (
        <Container style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Roboto' }} fluid>
            <Row style={{ paddingTop: "3%" }} className="justify-content-center">
                <Col md={8}>
                    <div style={{ marginBottom: "20px" }}>
                        <h2>Create Relief Campaign</h2>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formCampaignTitle">
                            <Form.Label>Campaign Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter campaign title"
                                value={campaignTitle}
                                onChange={(e) => setCampaignTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formCampaignDescription">
                            <Form.Label>Campaign Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter campaign description"
                                value={campaignDescription}
                                onChange={(e) => setCampaignDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formAllocatedFundAmount">
                            <Form.Label>Allocated Fund Amount (USDC)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter allocated fund amount"
                                value={allocatedFundAmount}
                                onChange={(e) => setAllocatedFundAmount(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formFundDispensePerIndividual">
                            <Form.Label>Fund Dispense Per Individual (USDC)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter fund dispense per individual (USDC)"
                                value={fundDispensePerIndividual}
                                onChange={(e) => setFundDispensePerIndividual(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "2%" }} controlId="formFundingOrganization">
                            <Form.Label>Funding Organization</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter funding organization"
                                value={fundingOrganization}
                                onChange={(e) => setFundingOrganization(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button style={{ marginTop: "2%", marginBottom: "2%" }} variant="primary" type="submit">
                            Create Campaign
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateCampaign;
