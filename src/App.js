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
    theme: 'light',
    currentAccount: null,
    value: '',
    collection_tokenId: [],
    collection_tokenName: [],
    collection_tokenImg: [],
    collection_tokenDescription: []
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
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <form onSubmit={this.mintNftHandler}>
        <div>
          <label>Token ID to unlock   </label>
          <input
            className='shadow sm:rounded-lg'
            id='form_input'
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
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
        <ThemeProvider theme={this.state.theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp>
            <h1>React Web3 Tutorial</h1>
            <h4>Want to try your luck?</h4>
            <div >
              {this.state.currentAccount ? this.mintNftButton() : this.connectWalletButton()}
            </div>
            <button class="button-moon" onClick={() => this.themeToggler()}></button>
            <h3>Publishing List</h3>
            <div className="flex flex-col mt-8">
              <div style={{backgroundColor: '#9197AE' }} className="shadow sm:rounded-lg py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Image:</th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Name:                 </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Description:</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                        {//map IMAGE
                          this.state.collection_tokenImg.map(
                            (item,i) => {
                              return(
                                <tr>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                            <img className="w-10 h-10" src={item} key={i}></img>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                          {this.state.collection_tokenName ? this.state.collection_tokenName[i] : ""}
                                      </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenDescription ? this.state.collection_tokenDescription[i] : ""}</span>
                                      </div>
                                    </td>
                                </tr>
                              )
                            })
                        }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </StyledApp>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;
