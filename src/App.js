import './App.css';
import {contractABI} from './contracts/contract_abi';
import { ethers } from 'ethers';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import { Component } from 'react/cjs/react.production.min';
import Collection from "./components/Collection"

const contractAddress = "0xb28D6A49A5eAc0E7B2eD1284614d38BDE69b5Bc8";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
class App extends Component {
  state = {
    theme: 'light',
    currentAccount: null,
    value: '',
    nft_array_id: [],
    nft_array_name: [],
    nft_array_img: []
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

    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

      let data = await nftContract.nftAccount();
      // get NFT metadata
      for(var i = 0;i<=data.length-1;i++){
        this.state.nft_array_id.push(data[i].toNumber());
        const pushed = nftContract.getNFT(data[i].toNumber());
        pushed.then(result => {
          this.state.nft_array_name.push(result);
          fetch("https://raw.githubusercontent.com/mcruzvas/react_web3/main/metadata/"+result.toString()+".json")
            .then(response => response.json())
            .then((jsonData) => {
              this.state.nft_array_img.push(jsonData.image)
            })
        }).catch((error) => {
          // handle your errors here
          console.error(error)
        })
      }

    } else {
      console.log("Ethereum object does not exist");
    }
}
  
  componentDidMount = () => {
    this.checkWalletIsConnected();

    //nft collection array
    this.collectionNftHandler();
    //console.log(this.state.nft_array_name)
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
            <Collection nft_array_id={this.state.nft_array_id} nft_array_name={this.state.nft_array_name} nft_array_img={this.state.nft_array_img}></Collection>

          </StyledApp>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;
