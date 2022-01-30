import { useEffect, useState } from 'react';
import './App.css';
import {contractABI} from './contracts/contract_abi';
import { ethers } from 'ethers';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

const contractAddress = "0xC68FA279948d38027EE84a3aD1737137BdA5ac5D";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
function App() {
  const [theme, setTheme] = useState("light");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [value, setValue] = useState('');

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.finishMint(value);

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
    <div>
        <form onSubmit={mintNftHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Token ID to unlock</label>
          <input
            style={{ marginLeft: '1vw' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button class="button-82-pushable" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Mint
            </span>
          </button>
        </div>
      </form>
    </div>
    )
  }
  
  useEffect(() => {
    checkWalletIsConnected();
  }, [])
//dark theme implementation
  return (
    <div className='main-app'>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <h1>React Web3 Tutorial</h1>
          
          <div>
            {currentAccount ? mintNftButton() : connectWalletButton()}
          </div>
          <button class="button-moon" onClick={() => themeToggler()}></button>
        </StyledApp>
    </ThemeProvider>

      
    </div>
  )
}

export default App;
