import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

function WorldCoin() {

  const handleVerify = async (proof) => {
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

const onSuccess = () => {
  // This is where you should perform any actions after the modal is closed
  // Such as redirecting the user to a new page
  window.location.href = "/success";
};


  return (
    <div className="App">
      <IDKitWidget
	app_id={process.env.REACT_APP_WORLDCOIN_APP_ID} // obtained from the Developer Portal
	action={process.env.REACT_APP_WOLDCOIN_ACTION_ID} // obtained from the Developer Portal
	onSuccess={onSuccess} // callback when the modal is closed
	handleVerify={handleVerify} // callback when the proof is received
	verification_level={VerificationLevel.Device}
>
	{({ open }) => 
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
    }
</IDKitWidget>
      <WorldCoin/>
    </div>
  );
}