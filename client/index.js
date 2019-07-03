import React from 'react';
import ReactDOM from 'react-dom';
import Description from './Components/Description.jsx'
import Specifications from './Components/Specifications.jsx'
import RatingsReviews from './Components/RatingsReviews.jsx'
import QuestionsAnswers from './Components/QuestionsAnswers.jsx'

class ProductDesc extends React.Component {
  constructor(props) {
    super(props);
    this.style= {
        lowesMedBackground: {
          backgroundColor: "#0471AF"
        },
        lowesDarkBackground: {
          backgroundColor: "#004990"
        }
    };
    this.state = {  
        string: 'this is the product description component!',
        descriptions: [],
        specifications: [],
        reviewData: {},
        questionAndAnswerData: {} 
     };
  }

  componentDidMount() {
    console.log(window)
    window.parent.postMessage('{"hello": "world"}', 'http://127.0.0.1:3000')
  }
 
  render() {
    const { descriptions, specifications, reviewData, questionAndAnswerData } = this.state;
    return (
      <div className='container'>
        <div className="accordion" id="accordionExample">
          <Description style={ this.style } desciptions={ descriptions } />
          <Specifications style={ this.style } specifications={ specifications } />
          <RatingsReviews style={ this.style } specifications={ reviewData } />
          <QuestionsAnswers style={ this.style } specifications={ questionAndAnswerData } />
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);