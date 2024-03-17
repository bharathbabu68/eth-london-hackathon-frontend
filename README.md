# Disaster Relief Aid Platform - ETHLondon 2024

![Platform Architecture](https://github.com/bharathbabu68/eth-london-hackathon-frontend/blob/main/CryptoRelief.jpg)

## Introduction

Welcome to the Disaster Relief Aid Platform, a project developed for the ETH London Hackathon. This platform leverages Circle's USDC stablecoin for efficient fund transfers and payouts in disaster relief scenarios. Traditional methods of distributing aid, involving physical cash, are cumbersome and slow. With this platform, organizations like UNICEF can create campaigns contributing USDC towards disaster relief, enabling faster and more efficient aid distribution to those in need.

## Features

- **USDC Integration**: Utilizes Circle's USDC stablecoin for seamless fund transfers and payouts.
- **World ID Authentication**: Prevents sybil attacks by authenticating users through World ID, ensuring proof of personhood.
- **Programmable Wallets**: Utilizes Circle's Programmable Wallets for securely holding USDC for each campaign.
- **Smart Contract Accounts (SCA)**: Leverages Ethereum's SCA feature, providing advanced functionalities for wallet management.
- **Gas Fee Abstraction**: Direct integration with Circle's gas station enables feeless fund transfers.
- **Circle Access Network Integration**: Future plans to leverage Circle's Access Network for easier on/off ramp for disaster-affected individuals.
- **Verification Layer**: Planned implementation using technologies such as oracles and Zero-Knowledge Proofs (ZKP) to verify individuals affected by disasters.

## How It Works

1. **Campaign Creation**: Organizations create campaigns contributing USDC towards disaster relief.
2. **World ID Authentication**: Users authenticate themselves through World ID, ensuring authenticity and preventing sybil attacks.
3. **Claiming Funds**: Authenticated users can claim portions of the funds for disaster recovery by filling out a form.
4. **Programmable Wallets**: Each campaign utilizes Circle's Programmable Wallets to securely hold the USDC funds.
5. **Gas Fee Abstraction**: Direct integration with Circle's gas station enables feeless fund transfers, ensuring efficient aid distribution.
6. **Future Integration**: Planned integration with Circle's Access Network for smoother on/off ramp for disaster-affected individuals.

## Technologies Used

- **Circle's USDC Stablecoin**
- **World ID for Authentication**
- **Circle's Programmable Wallets**
- **Ethereum's Smart Contract Accounts (SCA)**
- **Gas Fee Abstraction with Circle's Gas Station**
- **Future Integration with Circle's Access Network**

## Getting Started

To get started with the Disaster Relief Aid Platform, follow these steps:

1. Clone the repository.
2. Install dependencies.
3. Set up World ID authentication.
4. Integrate with Circle's USDC and Programmable Wallets.
5. Implement gas fee abstraction using Circle's gas station.
6. Explore future integrations with Circle's Access Network and verification layer.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests to improve the platform.

Special thanks to Circle and Worldcoin for providing the necessary APIs and technologies for this project, and to the organizers of ETH London Hackathon for the opportunity to develop this solution.
