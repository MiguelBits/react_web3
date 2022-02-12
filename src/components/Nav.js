import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Nav extends React.Component {

    render() {
      return (
        <nav id="navbar">
            <a href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#collection">Collection</a>
        </nav> 

      );
    }
}

export default Nav;
