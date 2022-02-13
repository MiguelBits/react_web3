import React from 'react'

import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';

class Home extends React.Component {
  state = {
    currentAccount: null
  }
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
  connectWalletButton = () => {
    return (
      <button onClick={this.connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
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
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }
    
  }
  mintNftButton = () => {
    return (
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <button onClick={this.mintNftHandler_Robot} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Robot
            </span>
        </button>
        <button onClick={this.mintNftHandler_God} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              God
            </span>
        </button>
        <button onClick={this.mintNftHandler_Superhuman} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Superhuman
            </span>
        </button>
        <button onClick={this.mintNftHandler_Alien} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Alien
            </span>
        </button>
        <button onClick={this.mintNftHandler_Animal} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Animal
            </span>
        </button>
        <button onClick={this.mintNftHandler_Darklink} class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              Darklink
            </span>
        </button>
    </div>
    )
  }
  
  mintNftHandler_Robot = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_Robot();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  mintNftHandler_God = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_God();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  mintNftHandler_Superhuman = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_Superhuman();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  mintNftHandler_Alien = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_Alien();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  mintNftHandler_Animal = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_Animal();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  mintNftHandler_Darklink = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint_Darklink();

        console.log("Mining... please wait");
        await nftTxn.wait();

        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        window.location.reload(false);


      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount = () => {
    this.checkWalletIsConnected();
  }
  render() {
    return (
      <div >
      {this.state.currentAccount ? this.mintNftButton() : this.connectWalletButton()}
      </div>
    );
  }
}

export default Home;
