import React from 'react';

class Collection extends React.Component {

    render() {
      return (
      <h2 id={this.props.nft_array_id}>
        <p>
        {
            this.props.nft_array_name.map((name) => (
            <li>{name}</li>
            ))
        }
        </p>
        <p>
        {this.props.nft_array_img.map((img) => (
            <img src={img}></img>
            ))
        }</p>
      </h2>
      );
    }
}

export default Collection;
