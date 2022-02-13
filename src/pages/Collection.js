import React from 'react'

import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import { Component } from 'react/cjs/react.production.min';

class Collection extends Component {
    state = {
        collection_tokenId: [],
        collection_tokenName: [],
        collection_tokenImg: [],
        collection_tokenStars: [],
        collection_tokenClass: [],
        collection_tokenElement: [],
        boost_value: ''
      };

  
    collectionNftHandler = async () => {
      //console.log("handling nft collection")
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        let data = await nftContract.Hero_inAccount();
        // get NFT metadata
        for(var i = 0;i<=data.length-1;i++){
          const array_nft_attributes = [];
          array_nft_attributes.push(data[i].toString())
          //0-get tokenId => data[i].toNumber()
          //1-get tokenImg => jsonData.image
          //2-get tokenName => nftContract.getNFT(data[i].toNumber())
          nftContract.uri(data[i]).then(urlValue => {
            //console.log(urlValue)
            fetch(urlValue)
                .then(response => response.json())
                .then((jsonData) => {
                  //console.log(jsonData)
                  array_nft_attributes.push(jsonData.image)
                  array_nft_attributes.push(jsonData.name)
                  array_nft_attributes.push(jsonData.properties.stars)
                  array_nft_attributes.push(jsonData.properties.class)
                  array_nft_attributes.push(jsonData.properties.element)


                  //update local storage listed by tokenId
                  //id
                  const previous_state_tokenId = this.state.collection_tokenId;
                  const updated_state_nft_tokenId = previous_state_tokenId.concat(array_nft_attributes[0])
                  this.setState({collection_tokenId: updated_state_nft_tokenId})
                  //img
                  const previous_state_tokenImg= this.state.collection_tokenImg;
                  const updated_state_nft_tokenImg = previous_state_tokenImg.concat(array_nft_attributes[1])
                  this.setState({collection_tokenImg: updated_state_nft_tokenImg})
                  //name
                  const previous_state_tokenName = this.state.collection_tokenName;
                  const updated_state_nft_tokenName = previous_state_tokenName.concat(array_nft_attributes[2])
                  this.setState({collection_tokenName: updated_state_nft_tokenName})
                  //stars
                  const previous_state_stars = this.state.collection_tokenStars;
                  const updated_state_nft_stars = previous_state_stars.concat(array_nft_attributes[3])
                  this.setState({collection_tokenStars: updated_state_nft_stars})
                  //class
                  const previous_state_class = this.state.collection_tokenClass;
                  const updated_state_nft_class = previous_state_class.concat(array_nft_attributes[4])
                  this.setState({collection_tokenClass: updated_state_nft_class})
                  //element
                  const previous_state_element = this.state.collection_tokenElement;
                  const updated_state_nft_element = previous_state_element.concat(array_nft_attributes[5])
                  this.setState({collection_tokenElement: updated_state_nft_element})
                })
          })
        }
  
      } else {
        console.log("Ethereum object does not exist");
      }
  }
  
  printStars(stars){
    let final_str = "✪";
    for (var i = 1; i < stars; i++) {
      final_str += "✪"
    }
    //console.log(final_str)
    return final_str 
  }    
  upgradeNftHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.getNFT_stars(this.state.boost_value).then(result => {
          alert("CurrentStars: "+result)
        })
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
  upgradeNftButton = () => {
    return (
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <form onSubmit={this.upgradeNftHandler}>
        <div>
          <label id="unlock">Token ID to upgrade   </label>
          <input
            className='shadow sm:rounded-lg'
            id='form_input'
            value={this.state.boost_value}
            onChange={(e) => this.setState({boost_value: e.target.value})}
          />
          <button class="button-82-pushable">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
              BOOST ✪
            </span>
          </button>
        </div>
      </form>
    </div>
    )
  }
  componentDidMount = () => {

    //nft collection array
    this.collectionNftHandler()
  };


  render(){
    return (
        <div className='collection-page'>
            <h1 class="neon-title-app">NFT Galaxy</h1>

            <div >
              {this.upgradeNftButton()}
            </div>

            <div class="wrap">
        
            {this.state.collection_tokenImg.map(
                (item,i) => {
                return(
                    <div key={i}>
                      <div id="container" class="box">
                          <div id="block-name">
                          <div class="nft_name_title" >
                              {/*Name*/}
                              <a target = "_blank" 
rel = "noopener noreferrer" href={"https://testnets.opensea.io/assets/"+contractAddress+"/"+this.state.collection_tokenId[i]}>{this.state.collection_tokenName ? this.state.collection_tokenName[i] : ""}</a>
                              <p>{this.state.collection_tokenId[i]}*</p>
                          </div>
                          </div>
                          <div class="boxInner">
                          {/*Image*/}
                          <img alt={this.state.collection_tokenId[i]} class="image_nft" src={item} ></img>
                          </div>
                          <div class="middle">
                          {/*Stars*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenStars ? this.printStars(this.state.collection_tokenStars[i]) : ""}</div>
                          {/*Class*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenClass ? this.state.collection_tokenClass[i] : ""}</div>
                          {/*Attributes*/}
                          <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{this.state.collection_tokenElement ? this.state.collection_tokenElement[i] : ""}</div>
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

export default Collection