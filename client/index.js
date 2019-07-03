// import React from 'react';
// import ReactDOM from 'react-dom'

class ProductDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        
     };
  }

  render() {
    return (
      <p>Hello World!</p>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);