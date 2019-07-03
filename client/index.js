import React from 'react';
import ReactDOM from 'react-dom';
import Description from './Components/Description.jsx'
import Specifications from './Components/Specifications.jsx'

class ProductDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
        string: 'this is the product description component!',
        descriptions: []
     };
  }

  componentDidMount() {
    console.log(window)
    window.parent.postMessage('{"hello": "world"}', 'http://127.0.0.1:3000')
  }
 
  render() {
    return (
      <div>
        <p>{ this.state.string }</p>
        <p>These are my props: { JSON.stringify(this.props) }</p>
        <div class="accordion" id="accordionExample">
          <Description desciptions={ this.state.descriptions } />
          <Specifications specifications={ this.state.specifications } />
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);