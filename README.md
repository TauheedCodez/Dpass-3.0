# Password Manager DApp 
 This is a beginner-friendly decentralized application (DApp) for saving and retrieving passwords.
 Deployed Netlify link 
 https://dpass30.netlify.app/

## Getting Started
To get this DApp running, follow the steps below:

### Install Metamask
### Contract Compilation and Deployment
1. install dependencies in both root directory and client directory 
```
npm install
```
2. Sign up Alchemy Account and create an app and select network as sepolia
3. install dotenv 
```
npm install dotenv
```
4. create a .env file in the client folder
```
ALCHEMY_API_URL="<your Aclchemy api url>"
PRIVATE_KEY="<your Metamask private key>"
```
5. compile contract
```
npx hardhat compile
```
6. Deploy contract on sepolia via hardhat
```
npx hardhat run --network sepolia scripts/deploy.js
```
7. copy paste the Deployed address in App.jsx
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

<img width="1917" height="963" alt="image" src="https://github.com/user-attachments/assets/3bccb91d-df64-4e21-a0a3-0c875e10e941" />

