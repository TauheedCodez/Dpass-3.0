# Password Manager DApp 
 This is a beginner-friendly decentralized application (DApp) for saving and retrieving passwords.
 Deployed Netlify link 
 https://dpass30.netlify.app/

## Getting Started
To get this DApp running, follow the steps below:

### Install Metamask
### Contract Compilation and Deployment
1. install dependencies
```
npm install
```
2. compile contract
```
npx hardhat compile
```
3. Deploy contract on sepolia via hardhat
```
npx hardhat run --network sepolia scripts/deploy.js
```
4. copy paste the Deployed address in App.jsx
5. Sign up Alchemy Account and create an app and select network as sepolia
6. install dotenv 
```
npm install dotenv
```
7. create a .env file in the client folder
```
ALCHEMY_API_URL="<your Aclchemy api url>"
PRIVATE_KEY="<your Metamask private key>"
```
8. run the project
```
npm run dev
```
`Incase if project is not running install these dependencies`
```
npm install react-hook-form
npm install ethers@5
```

## Project Screenshot:

![Screenshot 2025-04-10 130519](https://github.com/user-attachments/assets/d9133d1a-6b57-4ef2-b68f-c4597159a3de)
