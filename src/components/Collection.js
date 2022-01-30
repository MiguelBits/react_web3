import React from 'react';

class Collection extends React.Component {

    render() {
      return <h2>{
        this.props.nft_array.map((result) => (
        <li>{result}</li>
      ))
      }</h2>;
    }
}

export default Collection;
