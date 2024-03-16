import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'; // Import IDKitWidget from Worldcoin IDKit package

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);


  useEffect(() => {

    const staticCampaigns = [
      {
        id: 'campaign1',
        title: 'Support for Flood Victims',
        description: 'Providing aid to families affected by recent flooding in the region.',
        totalFundAmount: 50000,
        reliefAidPerPerson: 100,
        fundingOrganization: 'Red Cross',
        fundingWalletAddress: '0x5082f249cdb2f2c1ee035e4f423c46ea2dab3ab1', // Example address
        currentFundBalance: 25000,
      },
      {
        id: 'campaign2',
        title: 'Wildfire Relief Fund',
        description: 'Assisting communities impacted by devastating wildfires.',
        totalFundAmount: 75000,
        reliefAidPerPerson: 75,
        fundingOrganization: 'UNICEF',
        fundingWalletAddress: '0x5082f249cdb2f2c1ee035e4f423c46ea2dab3ab1', // Example address
        currentFundBalance: 50000,
      },
      {
        id: 'campaign3',
        title: 'Hurricane Recovery Assistance',
        description: 'Helping rebuild homes and provide essentials for hurricane-affected areas.',
        totalFundAmount: 100000,
        reliefAidPerPerson: 150,
        fundingOrganization: 'Save the Children',
        fundingWalletAddress: '0x5082f249cdb2f2c1ee035e4f423c46ea2dab3ab1', // Example address
        currentFundBalance: 60000,
      },
      {
        id: 'campaign4',
        title: 'Earthquake Relief Efforts',
        description: 'Supporting rescue and rehabilitation efforts in earthquake-stricken regions.',
        totalFundAmount: 80000,
        reliefAidPerPerson: 200,
        fundingOrganization: 'Oxfam',
        fundingWalletAddress: '0x5082f249cdb2f2c1ee035e4f423c46ea2dab3ab1', // Example address
        currentFundBalance: 30000,
      },
    ];

    // Calculate claimed percentage for each campaign
    const campaignsWithClaimedPercentage = staticCampaigns.map(campaign => ({
      ...campaign,
      claimedPercentage: ((campaign.totalFundAmount - campaign.currentFundBalance) / campaign.totalFundAmount) * 100,
    }));

    // Set the campaigns
    setCampaigns(campaignsWithClaimedPercentage);
  }, []);

  // Function to handle the claim funds button click
  const handleClaimFunds = (campaignId) => {
    // Open the IDKit modal for sign-in with World ID
    document.getElementById(`idkit-button-${campaignId}`).click();
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    // window.location.href = "/success";
  };

  const handleVerify = async (proof) => {
    proof = JSON.stringify(proof)
    console.log(proof)
    return
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};

  return (
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
                <Button variant="primary" style={{ marginTop: '10px' }} onClick={() => handleClaimFunds(campaign.id)}>Claim Funds</Button>
              </Card.Body>
            </Card>
            <IDKitWidget
              app_id={process.env.REACT_APP_WORLDCOIN_APP_ID} // obtained from the Developer Portal
              action={campaign.id} // Use campaign ID as action ID
              verification_level={VerificationLevel.Device}
              onSuccess={onSuccess} // callback when the modal is closed
              handleVerify={handleVerify} // callback when the proof is received
            >
              {({ open }) => (
                <button id={`idkit-button-${campaign.id}`} style={{ display: 'none' }} onClick={open}>Verify with World ID</button>
              )}
            </IDKitWidget>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Campaigns;
