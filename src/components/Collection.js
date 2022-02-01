import React from 'react';
import CollectionItem from './CollectionItem';

class Collection extends React.Component {

    render() {
      console.log(localStorage.getItem("nft_collection_"+this.props.img))
      return (
        <div className='card'>
          <div className='card-body p-5'>
            {console.log(this.props.img)}
            <h3>Publishing List</h3>
            <h1><CollectionItem value={this.props.img}/></h1>
            <table className='table mt-4'>
              <thread>
                <tr>
                  <th></th>
                  <th>tokenId: </th>
                  <th>tokenImg: </th>
                  <th>tokenName: </th>
                </tr>
              </thread>
            </table>
              <tbody>
                
              </tbody>
          </div>
        </div>
      );
    }
}

export default Collection;
