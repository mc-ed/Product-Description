import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Description from './Components/Description.jsx'
import Specifications from './Components/Specifications.jsx'
import RatingsReviews from './Components/RatingsReviews.jsx'
import QuestionsAnswers from './Components/QuestionsAnswers.jsx'

class ProductDesc extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleReadMore = this.handleReadMore.bind(this);
    this.style= {
        lowesMedBackground: {
          backgroundColor: "#0471AF"
        },
        lowesDarkBackground: {
          backgroundColor: "#004990"
        }
    };
    this.state = {  
        descriptions: [],
        specs: [],
        reviews: [],
        questions: []
     };
  }

  componentDidMount() {
    // window.parent.postMessage('{"hello": "world"}', 'http://127.0.0.1:3000')

    axios.get('/api/product/SOME_NUMBER')
    .then(data => this.setState({ ...data.data }))
  }

  handleClick(sign) {
    if(Array.from(sign.classList).includes('plusSign')) {
      sign.classList.remove('plusSign');
      sign.classList.add('minusSign');
    } else {
      sign.classList.remove('minusSign');
      sign.classList.add('plusSign');
    }
  }

  handleReadMore(el) {
    console.log(el)
  }
 
  render() {
    const { descriptions, specs, reviews, questions } = this.state;
    return (
      <div className='container'>
        <div className="accordion" id="accordionExample">
          <Description onClick={ this.handleClick } style={ this.style } descriptions={ descriptions } />
          <Specifications onClick={ this.handleClick } style={ this.style } specs={ specs } />
          <RatingsReviews onClick={ this.handleClick } readMore={ this.handleReadMore } style={ this.style } reviews={ reviews } />
          <QuestionsAnswers onClick={ this.handleClick } style={ this.style } questions={ questions } />
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);