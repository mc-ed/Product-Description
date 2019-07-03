import React from 'react';
import ReactDOM from 'react-dom';

class ProductDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
        string: 'this is a string!'
     };
  }

  render() {
    return (
      <p>{ this.state.string }</p>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);