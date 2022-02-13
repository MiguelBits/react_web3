import React from 'react';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import './../css/Battle.css';

class Battle extends React.Component {
  state = {
    timeLeft: 0
  }
  getStakedTimeLeft(id) {
    const { ethereum } = window;
  
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
      nftContract.getStakedTimedLeft(id).then(result=>{
        this.setState({timeLeft: parseInt(result._hex.toString())})
      })
    } 
    else {
      console.log("Ethereum object does not exist");
    }
  }
  componentDidMount = () => {
    //this.getStakedTimeLeft(1);
  }
  render() {
    return (
      <div className='battle-page'>
        <div id="staked-time">
            <img src="https://github.com/mcruzvas/react_web3/blob/battle_staked-version1/public/clock2.png?raw=true"/>
            <p>{this.state.timeLeft}</p>
        </div>
      </div>
    );
  }
}

export default Battle;
