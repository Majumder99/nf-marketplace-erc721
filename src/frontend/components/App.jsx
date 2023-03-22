import { ethers } from "ethers";
import { useState } from "react";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import NFTAddress from "../contractsData/NFT-address.json";
import NFTAbi from "../contractsData/NFT.json";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  // MetaMask Login/Connect, code for connectin th metamask
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    // signer is like address.. we need this for getting the insance of contract
    //what is signer here? signer is the address of the user
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };
  return (
    <>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Spinner animation="border" style={{ display: "flex" }} />
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Home marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/create"
                element={<Create marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/my-listed-items"
                element={
                  <MyListedItems
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
              <Route
                path="/my-purchases"
                element={
                  <MyPurchases
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
