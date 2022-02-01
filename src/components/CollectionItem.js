import React from 'react';

class CollectionItem extends React.Component {

    render() {
      return (
        <div>
            {this.props.value}
        </div>
      );
    }
}

export default CollectionItem;
