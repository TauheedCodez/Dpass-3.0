import Upload from "../../artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TextUpload from "./components/TextUpload";
import Display from "./components/Display";
import { Shield, AlertTriangle } from "lucide-react";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      alert("Please install MetaMask");
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

        let contractAddress = "Your Deployed Contract Address";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">Dpass 3.0</h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Your Decentralized Password Manager
          </p>

          {/* MetaMask Account */}
          {account ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Connected Account</p>
              <p className="text-blue-400 font-mono text-lg font-semibold break-all">
                {account}
              </p>
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-semibold">MetaMask Required</h3>
                  <p className="text-red-300 text-sm mt-1">
                    Please install MetaMask browser extension to use this application.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Text Upload */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-teal-400" />
              Add New Password
            </h2>
            <TextUpload account={account} provider={provider} contract={contract} />
          </div>

          {/* Display */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-400" />
              View Passwords
            </h2>
            <Display account={account} contract={contract} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
