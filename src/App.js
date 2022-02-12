import './App.css';
import {contractABI} from './contracts/contract_abi';
import { ethers } from 'ethers';
import styled from "styled-components";
import { Component } from 'react/cjs/react.production.min';
import Nav from "./components/Nav"


const contractAddress = "0xb28D6A49A5eAc0E7B2eD1284614d38BDE69b5Bc8";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
class App extends Component {
  state = {
    currentAccount: null,
    mint_value: '',
    collection_tokenId: [],
    collection_tokenName: [],
    collection_tokenImg: [],
    collection_tokenDescription: []
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
      window.location.reload(false);
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
        let nftTxn = await nftContract.finishMint(this.state.mint_value);

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
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <form onSubmit={this.mintNftHandler}>
        <div>
          <label id="unlock">Token ID to unlock   </label>
          <input
            className='shadow sm:rounded-lg'
            id='form_input'
            mint_value={this.state.mint_value}
            onChange={(e) => this.setState({mint_value: e.target.mint_value})}
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
    //console.log("handling nft collection")
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

      let data = await nftContract.nftAccount();
      // get NFT metadata
      for(var i = 0;i<=data.length-1;i++){
        const array_nft_attributes = [];
        array_nft_attributes.push(data[i].toString())
        //0-get tokenId => data[i].toNumber()
        //1-get tokenImg => jsonData.image
        //2-get tokenName => nftContract.getNFT(data[i].toNumber())

        const pushed = nftContract.getNFT(data[i].toNumber());
        pushed.then(result => {
          //console.log("https://raw.githubusercontent.com/mcruzvas/react_web3/main/metadata/"+result.toString()+".json")
          fetch("https://raw.githubusercontent.com/mcruzvas/react_web3/main/metadata/"+result.toString()+".json")
            .then(response => response.json())
            .then((jsonData) => {
              array_nft_attributes.push(jsonData.image)
              array_nft_attributes.push(result.toString())
              array_nft_attributes.push(jsonData.description)
              //update local storage listed by tokenId
              const previous_state_tokenId = this.state.collection_tokenId;
              const updated_state_nft_tokenId = previous_state_tokenId.concat(array_nft_attributes[0])
              this.setState({collection_tokenId: updated_state_nft_tokenId})
              const previous_state_tokenImg= this.state.collection_tokenImg;
              const updated_state_nft_tokenImg = previous_state_tokenImg.concat(array_nft_attributes[1])
              this.setState({collection_tokenImg: updated_state_nft_tokenImg})
              const previous_state_tokenName = this.state.collection_tokenName;
              const updated_state_nft_tokenName = previous_state_tokenName.concat(array_nft_attributes[2])
              this.setState({collection_tokenName: updated_state_nft_tokenName})
              const previous_state_tokenDescription = this.state.collection_tokenDescription;
              const updated_state_nft_tokenDescription = previous_state_tokenDescription.concat(array_nft_attributes[3])
              this.setState({collection_tokenDescription: updated_state_nft_tokenDescription})

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
    this.collectionNftHandler()
  };
  componentWillUpdate() {
    //console.log(this.state.collection_tokenId)
    //console.log(this.state.collection_tokenName)
    //console.log(this.state.collection_tokenImg)
  }
  

//dark theme implementation
  render(){
    return (
      <div className='main-app'>
        <Nav/>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <h1 class="neon-title-app">NFT Galaxy</h1>

            <div >
              {this.state.currentAccount ? this.mintNftButton() : this.connectWalletButton()}
            </div>

            <div class="wrap">
        
              {this.state.collection_tokenImg.map(
                (item,i) => {
                  return(
                    <div>
                      <div id="container" class="box">
                        <div id="block-name">
                          <div class="nft_name_title" >
                              {/*Name*/}
                              <a href={"https://testnets.opensea.io/assets/0xb28D6A49A5eAc0E7B2eD1284614d38BDE69b5Bc8/"+this.state.collection_tokenId[i]}>{this.state.collection_tokenName ? this.state.collection_tokenName[i] : ""}</a>
                          </div>
                        </div>
                        <div class="boxInner">
                          {/*Image*/}
                          <img class="image_nft" src={item} key={i}></img>
                        </div>
                        <div class="middle">
                          {/*Description*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenDescription ? this.state.collection_tokenDescription[i] : ""}</div>
                          {/*Attributes*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenDescription ? this.state.collection_tokenDescription[i] : ""}</div>
                          {/*Attributes*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenDescription ? this.state.collection_tokenDescription[i] : ""}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
      </div>
    )
  }
}

export default App;
