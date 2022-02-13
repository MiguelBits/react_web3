import React from 'react'
import './../css/Home.css';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';

class Home extends React.Component {
  state = {
    Robot_planets_population: 0,
    God_planets_population: 0,
    Superhuman_planets_population: 0,
    Alien_planets_population: 0,
    Animal_planets_population: 0,
    Darklink_planets_population: 0
  }
  async mintNftHandler(class_id){

  }
  getPopulation(class_id){
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        nftContract.getPopulation(class_id).then(result => {
          console.log(result)
        })

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  
  componentDidMount = () => {
    this.setState({Robot_planets_population:this.getPopulation(1)})
    this.setState({God_planets_population:this.getPopulation(2)})
    this.setState({Superhuman_planets_population:this.getPopulation(3)})
    this.setState({Alien_planets_population:this.getPopulation(4)})
    this.setState({Animal_planets_population:this.getPopulation(5)})
    this.setState({Darklink_planets_population:this.getPopulation(6)})
    console.log(this.state.Alien_planets_population)
  }
  
  render() {
    return (
      <div id="home-page">
          <button onClick={() => this.mintNftHandler(1)} class="cyber_button">
            <span aria-hidden>Robot</span>
            <img id="robot-planet" src="https://github.com/mcruzvas/react_web3/blob/home-page-css/public/planets/robot.png?raw=true"></img>
          </button>
          <p></p>
          <button onClick={() => this.mintNftHandler(2)} class="cyber_button">
            <span aria-hidden>God</span>
            <img id="god-planet" src="https://github.com/mcruzvas/react_web3/blob/home-page-css/public/planets/god.png?raw=true"></img>
          </button>
          
          <button onClick={() => this.mintNftHandler(3)} class="cyber_button">
            <span aria-hidden>Superhuman</span>
            <img id="superhuman-planet" src="https://github.com/mcruzvas/react_web3/blob/home-page-css/public/planets/superhuman2.png?raw=true"></img>
          </button>
          
          <button onClick={() => this.mintNftHandler(4)} class="cyber_button">
            <span aria-hidden>Alien</span>
            <img id="alien-planet" src="https://github.com/mcruzvas/react_web3/blob/home-page-css/public/planets/alien.png?raw=true"></img>
          </button>
          <button onClick={() => this.mintNftHandler(5)} class="cyber_button">
            <span aria-hidden>Animal</span>
          </button>
          
          <button onClick={() => this.mintNftHandler(6)} class="cyber_button">
            <span aria-hidden>Darklink</span>
          </button>
          
      </div>
    )
  }
}

export default Home;
