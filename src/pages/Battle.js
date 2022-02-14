import React from 'react';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import './../css/Battle.css';

class Battle extends React.Component {
  state = {
    timeLeft: 0,
    staked_id: 1,
  }
  
  componentDidMount = () => {
  }

  render() {
    return (
      <div className='battle-page'>
        <div id="staked-time">
            <img alt="clock" src="https://github.com/mcruzvas/react_web3/blob/battle_staked-version1/public/clock2.png?raw=true"/>
            <p>0</p>
        </div>
        
      </div>
    );
  }
}

export default Battle;
