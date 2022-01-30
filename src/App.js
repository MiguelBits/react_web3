import './App.css';
import {contractABI} from './contracts/contract_abi';
import { ethers } from 'ethers';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import { Component } from 'react/cjs/react.production.min';

const contractAddress = "0xb28D6A49A5eAc0E7B2eD1284614d38BDE69b5Bc8";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
class App extends Component {
  state = {
    theme: '',
    currentAccount: null,
    value: ''
  };


  themeToggler = () => {
    this.state.theme === "light" ? this.setState({ theme: "dark" }) : this.setState({ theme:"light" });
  };

  checkWalletIsConnected = async () => {
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
      this.setState({currentAccount: account});
    } else {
      console.log("No authorized account found");
    }
    
  }

  connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      this.setState({accounts:accounts[0]});
    } catch (err) {
      console.log(err)
    }
  }

  mintNftHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.finishMint(this.state.value);

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

  connectWalletButton = () => {
    return (
      <button onClick={this.connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  mintNftButton = () => {
    return (
    <div>
        <form onSubmit={this.mintNftHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Token ID to unlock</label>
          <input
            style={{ marginLeft: '1vw' }}
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value})}
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
  collectionNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        let data = await nftContract.nftAccount();
        const arr = data.map(data => <h2>{data}</h2>);
        return (<div >{arr}</div>);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  
  componentDidMount = () => {
    this.checkWalletIsConnected();
  };
//dark theme implementation
  render(){
    return (
      <div className='main-app'>
        <ThemeProvider theme={this.state.theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp>
            <h1>React Web3 Tutorial</h1>
            
            <div>
              {this.state.currentAccount ? this.mintNftButton() : this.connectWalletButton()}
            </div>
            <button class="button-moon" onClick={() => this.themeToggler()}></button>
          </StyledApp>
        </ThemeProvider>

      </div>
    )
  }
}

export default App;
