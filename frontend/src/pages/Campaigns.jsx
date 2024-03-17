import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { IDKitWidget, useIDKit } from '@worldcoin/idkit'

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [action, setAction] = useState(null); // State variable to store the action value
  const { open, setOpen } = useIDKit();

  async function getAllReliefCampaigns() {
    try {
      const response = await fetch("http://localhost:4000/api/getAllReliefCampaigns");
      const data = await response.json();
      console.log(data);
      const campaignsWithClaimedPercentage = data.map(campaign => ({
        id: campaign._id,
        title: campaign.campaignTitle,
        description: campaign.campaignDescription,
        totalFundAmount: campaign.allocatedFundAmount,
        reliefAidPerPerson: campaign.fundDispensePerIndividual,
        fundingOrganization: campaign.fundingOrganization,
        fundingWalletAddress: campaign.fundingWalletAddress,
        currentFundBalance: campaign.currentFundBalance,
        claimedPercentage: (campaign.currentFundBalance / campaign.allocatedFundAmount) * 100,
      }));
      setCampaigns(campaignsWithClaimedPercentage);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  }

  useEffect(() => {
    getAllReliefCampaigns();
  }, []);

  // Function to handle the claim funds button click
  const handleClaimFunds = (campaign) => {
    setAction(campaign.id); // Set the action value to the campaign's ID
    setOpen(true);
  };

  const handleVerify = async (proof) => {
    const res = await fetch("http://localhost:4000/api/verifyProof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "proof": proof,
        "action": action,
      })
    });
    if (!res.ok) {
      setOpen(false);
      alert("User has already claimed the relief value!");
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = `/claim/${action}`;
  };

  return (
    <>
      <IDKitWidget
        app_id={process.env.REACT_APP_WORLDCOIN_APP_ID} // obtained from the Developer Portal
        action={action} // Pass the action value
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        verification_level="device" // Minimum verification level accepted
      />

      <Container style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', fontFamily: 'Roboto', textAlign: 'left' }} fluid>
        <h4 style={{ textAlign: 'left', paddingTop: '2%' }}>Active Relief Campaigns</h4>
        <p>Displayed are a list of active campaigns to help people affected by disasters.</p>
        <Row>
          {campaigns.map((campaign) => (
            <Col md={4} key={campaign.id} style={{ marginBottom: '20px' }}>
              <Card style={{ height: '100%' }}>
                <Card.Body>
                  <Card.Title>{campaign.title}</Card.Title>
                  <Card.Text>{campaign.description}</Card.Text>
                  <Card.Text>Total Fund Amount: {campaign.totalFundAmount}</Card.Text>
                  <Card.Text>Relief Aid Per Person: {campaign.reliefAidPerPerson}</Card.Text>
                  <Card.Text>Funding Organization: {campaign.fundingOrganization}</Card.Text>
                  <Card.Text>Funding Wallet Address: <a href={`https://mumbai.polygonscan.com/address/${campaign.fundingWalletAddress}`} target="_blank" rel="noopener noreferrer">{campaign.fundingWalletAddress}</a></Card.Text>
                  <Card.Text>Current Fund Balance: {campaign.currentFundBalance}</Card.Text>
                  <ProgressBar now={campaign.claimedPercentage} label={`${campaign.claimedPercentage.toFixed(2)}% claimed`} />
                  <Button variant="outline-primary" style={{ marginTop: '20px' }} onClick={() => handleClaimFunds(campaign)}>Verify World ID</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Campaigns;
