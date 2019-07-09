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
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
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
        reviewStats: {},
        reviewCount : 10,
        questions: []
     };
  }

  componentDidMount() {
    window.addEventListener('product', (e) => {
      const id = e.detail.product_id;
      console.log(id)
      axios.get(`/api/product/${id}?review=0`)
      .then(data => {
        console.log(data)
        this.setState({ ...data.data })
      })
    })

    axios.get(`/api/product/1?review=0`)
    .then(data => {
      console.log(data)
      this.setState({ ...data.data })
    })
  }

  handleClick(sign) {
    if(Array.from(sign.classList).includes('plusSign')) {
      Array.from(document.getElementsByClassName('minusSign')).forEach(el => {
        el.classList.remove('minusSign');
        el.classList.add('plusSign');
      })
      sign.classList.remove('plusSign');
      sign.classList.add('minusSign');
    } else {
      sign.classList.remove('minusSign');
      sign.classList.add('plusSign');
    }
  }

  handleMoreReviews() {
    if(this.state.reviewStats.reviewCount - this.state.reviewCount < 10) {
      this.setState(state => {return {reviewCount: state.reviewStats.reviewCount}})
    } else {
      this.setState(state => {return {reviewCount: state.reviewCount + 10}}, () => {
        axios.get(`/api/product/1?review=${this.state.reviewCount}`)
      .then(data => {
        this.setState(state => {
          return {
            reviews: [...state.reviews, ...data.data.reviews]
          }
        })
      })
      })
    }
  }
 

  render() {
    const { descriptions, specs, reviews, questions, reviewCount, reviewStats } = this.state;
    return (
      <div className='container'>
        <div className="accordion" id="accordionExample">
          <Description onClick={ this.handleClick } style={ this.style } descriptions={ descriptions } />
          <Specifications onClick={ this.handleClick } style={ this.style } specs={ specs } />
          <RatingsReviews onClick={ this.handleClick } style={ this.style } reviews={ reviews } count={reviewCount} moreReviews={this.handleMoreReviews} stats={reviewStats} />
          <QuestionsAnswers onClick={ this.handleClick } style={ this.style } questions={ questions } />
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);