# Password Manager DApp 
 This is a beginner-friendly decentralized application (DApp) for saving and retrieving passwords.

## Getting Started
To get this DApp running, follow the steps below:

### Install Metamask
### Contract Compilation and Deployment
1. compile contract
```
npx hardhat compile
```
2. Deploy contract on hardhat
```
npx hardhat run --network sepolia scripts/deploy.js
```
3. copy paste the Deployed address in App.jsx
4. Sign up Alchemy Account and create an app and select network as sepolia
5. create an .env file
```
npm install dotenv
```
6. create a .env file in the client folder
```
ALCHEMY_API_URL="<your Aclchemy api url>"
PRIVATE_KEY="<your Metamask private key>"
```
7. run the project
```
npm run dev
```
