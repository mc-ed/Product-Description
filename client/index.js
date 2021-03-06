import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';
import Description from './Components/Description.jsx';
import Specifications from './Components/Specifications.jsx';
import RatingsReviews from './Components/RatingsReviews.jsx';
import QuestionsAnswers from './Components/QuestionsAnswers.jsx';
import styles from './styles/index.less';
import ReviewModal from './Components/ReviewModal.jsx';
import MessageModal from './Components/MessageModal.jsx';
import QuestionModal from './Components/QuestionModal.jsx';
import AnswerModal from './Components/AnswerModal.jsx';
import API from './API/main.js';
import helpers from './helpers/indexHelpers.js';



class ProductDesc extends React.Component {
	constructor(props) {
		super(props);
		this.handleAccordionToggle = this.handleAccordionToggle.bind(this);
		this.handleMoreReviews = this.handleMoreReviews.bind(this);
		this.handleFeedBackClick = this.handleFeedBackClick.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmitReview = this.handleSubmitReview.bind(this);
		this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
		this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
		this.handleReviewSort = this.handleReviewSort.bind(this);
		this.handleQuestionSort = this.handleQuestionSort.bind(this);
		this.handleQuestionSearch = this.handleQuestionSearch.bind(this);
		this.state = {
      toggleModals: {
        review: false,
        message : false,
		question: false,
		answer : false
      },
			message: {
				title: '',
				message: ''
			},
			descriptions: [],
			specs: [],
			reviews: [],
			reviewStats: {},
			reviewCount: 10,
			questions: [],
			reviewSortType: '',
			product_id: 1,
			element_ID: null
		};
	}

	componentDidMount() {
    const type = this.state.reviewSortType;
    const id = this.state.product_id;
		// this.getProducts(id, type);
		window.addEventListener('product', e => {
			const id = e.detail.product_id;
      		this.getProducts(id, type);
		});
	}


	getProducts(id, type, reviewIndex) {
    reviewIndex = reviewIndex || 0;
		API.getAllProductDataByID(id, type, reviewIndex).then(res => {
      helpers.setState.updateProductData(res, this);
		});
  }

	handleAccordionToggle(sign) {
    helpers.toggleAccordion(sign);
	}

	handleMoreReviews() {
		const id = this.state.product_id;
    const type = this.state.reviewSortType;
    helpers.setState.setReviewCounter(this, () => {
      API.getAllProductDataByID(id, type, this.state.reviewCount)
      .then(res => helpers.setState.moreReviews(res, this))
    })
	}

	handleFeedBackClick(feedbackID, selection, category) {
		const productID = this.state.product_id;
    API.updateFeedbackForReviewsAndQuestions(productID, feedbackID, selection, category)
    .then(res => helpers.renderFeedbackAndModals(res, this, {productID, feedbackID, selection, category}))
	}

  toggleModal(type, element_ID = null) {
    helpers.setState.toggleModal(type, this, element_ID);
  }

	handleSubmitReview(review) {
    const id = this.state.product_id;
    API.submitReview(id, review)
		.then(res =>{
      const {title, message} = res.data;
      helpers.setState.setModalMessage(title, message, this)
      this.toggleModal('message');

			window.dispatchEvent(new CustomEvent('stars',{detail: {id}}));
      this.getProducts(id, '', 0)
		})
		.catch(error => {
	  const {err, message} = error.response.data;
      helpers.setState.setModalMessage("Server error: " + err, "Sorry, we encountered the following error:\n\n" + message, this)
		})
	}

	handleReviewSort(type) {
    const id = this.state.product_id;
    helpers.setState.setReviewSortType(type, this, () => {
      API.getAllProductDataByID(id, type, 0)
      .then(res => helpers.setState.resetReviewDataBySortType(res, this))
    })
	}

	handleQuestionSort(type) {
		const id = this.state.product_id;
		// axios.get(`http://localhost:3050/api/questions/${id}?type=${type}`, {withCredentials: true})
		axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/questions/${id}?type=${type}`, {withCredentials: true})
		.then(data => {this.setState({questions : data.data})})
	}

	handleSubmitQuestion(question) {
		const id = this.state.product_id;
		// let type = this.state.reviewSortType;
		axios.post('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/question', {...question, product_id: this.state.product_id}, {withCredentials: true})
		// axios.post('http://localhost:3050/api/question', {...question, product_id: this.state.product_id}, {withCredentials: true})
		.then(results =>{
			this.setState({
				toggleModals: {
          ...this.state.toggleModals,
          message : true
        },
				message: {
					title: results.data.title,
					message: results.data.message
				}
			})

			// axios.get(`http://localhost:3050/api/product/${id}?review=0&type=`, {withCredentials: true}).then(data => {
			axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=0&type=`, {withCredentials: true}).then(data => {
				if (data.data.reviewStats.reviewCount < 10) {
					this.setState({ ...data.data, reviewCount: data.data.reviewStats.reviewCount });
				} else {
					this.setState({ ...data.data, reviewCount: 10 });
				}
			});
		})
		.catch(err => {
			this.setState({
				toggleModals: {
          ...this.state.toggleModals,
          message : true
        },
				message: {
					title: "Server error: " + err.response.data.err,
					message: "Sorry, we encountered the following error:\n\n" + err.response.data.message
				}
			})
		})
	}

	handleSubmitAnswer(answer) {
		const {product_id} = this.state;
		API.submitAnswer(answer, product_id)
		.then(res => {
			const {title, message} = res.data
			helpers.setState.setModalMessage(title, message, this);
			this.getProducts(product_id, '', 0);
		})
		.catch(error => {
			let {err, message} = error.response.data;
			err = "Server error: " + err;
			message = "Sorry, we encountered the following error:\n\n" + message;
			helpers.setState.setModalMessage(err, message, this);
		})
	}

	handleQuestionSearch(search) {
		const id = this.state.product_id;
		// axios.get(`http://localhost:3050/api/search?product_id=${id}&type=questions&string=${encodeURI(search)}`)
		axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/search?product_id=${id}&type=questions&string=${encodeURI(search)}`)
		.then(results => this.setState({questions: results.data}));
	}

	render() {
		const { descriptions, specs, reviews, questions, reviewCount, reviewStats, toggleModals, element_ID } = this.state;
		return (
			<div className={`container ${styles.font}`}>
				<MessageModal show={toggleModals.message} toggle={this.toggleModal} message={this.state.message}/>
				<ReviewModal show={toggleModals.review} toggle={this.toggleModal} submit={this.handleSubmitReview}/>
				<QuestionModal show={toggleModals.question} toggle={this.toggleModal} submit={this.handleSubmitQuestion}/>
				<AnswerModal show={toggleModals.answer} toggle={this.toggleModal} submit={this.handleSubmitAnswer} question_id={element_ID} />
				<Accordion>
					<Description toggle={this.handleAccordionToggle} descriptions={descriptions} />
					<Specifications toggle={this.handleAccordionToggle} specs={specs} />
					<RatingsReviews
						toggle={this.handleAccordionToggle}
						reviews={reviews}
						count={reviewCount}
						moreReviews={this.handleMoreReviews}
						stats={reviewStats}
						helpfulClick={this.handleFeedBackClick}
						newReview={this.toggleModal}
						sort={this.handleReviewSort}
					/>
					<QuestionsAnswers helpfulClick={this.handleFeedBackClick} toggle={this.handleAccordionToggle} questions={questions} newQandA={this.toggleModal} search={this.handleQuestionSearch} sort={this.handleQuestionSort} />
				</Accordion>
			</div>
		);
	}
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);