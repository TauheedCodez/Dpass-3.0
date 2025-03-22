import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TextUpload from "./components/TextUpload";
import Display from "./components/Display";
import './App.css'

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      alert("Please install mertamask")
    }

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "Your Deployed Address";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <div className="App">
        <h1 className="app-heading">Dpass 3.0</h1>
        <p>
          Account : {account ? account : "Not connected"}
        </p>
        <TextUpload account={account} provider={provider} contract={contract} />
        <Display account={account} contract={contract} />
      </div>
    </>
  )
}

export default App