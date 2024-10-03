# AI Model Marketplace dApp
This project is a decentralized application (dApp) built on the Ethereum blockchain that allows users to list, purchase, and rate AI models. The marketplace operates using MetaMask for Ethereum transactions and smart contract interactions.
## Features
- **List AI Models**: Users can list AI models with a name, description, and price (in ETH).
- **Purchase AI Models**: Users can purchase listed AI models using ETH.
- **Rate AI Models**: Users can rate models, and the app calculates and displays the average rating for each model.
- **View Listed Models**: All listed models are displayed with their name, description, price, and average rating.
## Technologies Used
- **Ethereum Blockchain**: Ganache is used for a local blockchain network.
- **Solidity**: Smart contract programming language for the Ethereum blockchain.
- **Web3.js**: JavaScript library for interacting with the Ethereum blockchain and MetaMask.
- **HTML/CSS/JavaScript**: Frontend structure using vanilla HTML, CSS, and JavaScript.
## Prerequisites
- **MetaMask**: Ensure you have the MetaMask browser extension installed.
- **Ganache**: Used for running a local blockchain network.
### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-model-marketplace.git
   cd ai-model-marketplace
2. **Install dependencies: Run the following command to install the web3.js library:**:
   npm install
3. **Start Ganache: Run the following command to start a local blockchain:**:
   ganache-cli --port 8800
4. **Deploy the Smart Contract:**:
   Open Remix IDE (https://remix.ethereum.org/).
   Copy the Solidity contract from the contracts/Marketplace.sol file.
   Compile the contract and deploy it using Injected Web3 in Remix.
   Copy the deployed contract address and replace the address in app.js with the new contract address.
5. **Run the Web Application:**:
   ganache-cli --port 8800
5. **MetaMask Setup:**:
   Ensure your MetaMask is connected to your local blockchain network:
   RPC URL: http://localhost:8800
   Chain ID: 1337
   Import an account from Ganache into MetaMask using the provided private key.
### How to Use
1. **List a Model:**:
   Enter the model's name, description, and price (in ETH).
   Click List Model to publish the model on the blockchain.
2. **Purchase a Model:**:
   Enter the model ID of the model you want to purchase.
   Click Purchase Model and confirm the transaction in MetaMask.
3. **Rate a Model:**:
   Enter the model ID and your rating (1-5).
   Click Rate Model to submit your rating.
4. **View Available Models:**:
   Listed models with their details and average rating will be displayed on the homepage.
## Smart Contract Details
- The smart contract is located in contracts/Marketplace.sol.
- It includes the following functions:
 - listModel(name, description, price): Allows users to list a new AI model.
 - purchaseModel(modelId): Allows users to purchase a listed AI model.
 - rateModel(modelId, rating): Allows users to rate a purchased AI model.
 - getModelDetails(modelId): Retrieves the details of a specific AI model.
## Smart Contract Details
- Add filtering options to sort models by rating or price.
- Add a search bar to find models by name or description.
- Implement a frontend framework (React, Vue) for better UI/UX.
- Add user authentication for enhanced security.
## License
This project is open-source and available under the MIT License.
