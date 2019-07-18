// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';
import Description from './Components/Description.jsx';
import Specifications from './Components/Specifications.jsx';
import RatingsReviews from './Components/RatingsReviews.jsx';
import QuestionsAnswers from './Components/QuestionsAnswers.jsx';
import styles from './styles/index.less';
import signs from './styles/signs.less';
import ReviewModal from './Components/ReviewModal.jsx';
import MessageModal from './Components/MessageModal.jsx';

class ProductDesc extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleMoreReviews = this.handleMoreReviews.bind(this);
		this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
		this.toggleReviewModal = this.toggleReviewModal.bind(this);
		this.toggleMessageModal = this.toggleMessageModal.bind(this);
		this.toggleQuestionModal = this.toggleQuestionModal.bind(this);
		this.handleSubmitReview = this.handleSubmitReview.bind(this);
		this.handleReviewSort = this.handleReviewSort.bind(this);
		this.state = {
			newReviewModal: false,
			messageModal: false,
			questionModal : false,
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
			product_id: 1
		};
	}

	componentDidMount() {
		this.getProducts();
		window.addEventListener('product', e => {
			let type = this.state.reviewSortType;
			const id = e.detail.product_id;
			axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=0&type=${type}`, {withCredentials: true}).then(data => {
				if (data.data.reviewStats.reviewCount < 10) {
					this.setState({ ...data.data, reviewCount: data.data.reviewStats.reviewCount });
				} else {
					this.setState({ ...data.data, reviewCount: 10 });
				}
			});
		});
	}


	getProducts() {
		const type = this.state.reviewSortType;
		const id = this.state.product_id;
		axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=0&type=${type}`, {withCredentials: true}).then(data => {
			if (data.data.reviewStats.reviewCount < 10) {
				this.setState({ ...data.data, reviewCount: data.data.reviewStats.reviewCount });
			} else {
				this.setState({ ...data.data, reviewCount: 10 });
			}
		});
	}

	handleClick(sign) {
		if (Array.from(sign.classList).includes(signs.plusSign)) {
			Array.from(document.getElementsByClassName(signs.minusSign)).forEach(el => {
				el.classList.remove(signs.minusSign);
				el.classList.add(signs.plusSign);
			});
			sign.classList.remove(signs.plusSign);
			sign.classList.add(signs.minusSign);
		} else {
			sign.classList.remove(signs.minusSign);
			sign.classList.add(signs.plusSign);
		}
	}

	handleMoreReviews() {
		let id = this.state.product_id || 1;
		let type = this.state.reviewSortType;
		if (this.state.reviewStats.reviewCount - this.state.reviewCount < 10) {
			this.setState(state => {
				return { reviewCount: state.reviewStats.reviewCount };
			});
		} else {
			this.setState(
				state => {
					return { reviewCount: state.reviewCount + 10 };
				},
				() => {
					axios
						.get(
							`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=${
								this.state.reviewCount
							}&type=${type}`, {withCredentials: true}
						)
						.then(data => {
							console.log(data)
							this.setState(state => {
								return {
									reviews: [...state.reviews, ...data.data.reviews]
								};
							});
						});
				}
			);
		}
	}

	handleHelpfulClick(helpfulID, selection) {
		axios.get('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/helpful/'+ this.state.product_id +'?id=' + helpfulID + '&selection=' + selection, {withCredentials: true})
		.then(results => {
			if(results.data.allow === true) {
				let reviews = [...this.state.reviews];
				let objToChange = reviews.find(review => review._id === helpfulID);
				if(selection === 'yes' || selection === 'no') {
					++objToChange.helpful[selection];
					this.setState({
						messageModal: true,
						reviews : reviews,
						message :{
							title: "Feedback Submitted - Thank you!",
							message: "Thank you for your feedback!"
						}
					})
				}
			} else if(results.data.allow === false) {
				this.setState({
					messageModal : true,
					message :{
						title: "Feedback already given",
						message: "Looks like you've already given feedback to this review. Do you not remember?"
					}
				})
			}
			if(results.data.reported) {
				this.setState({
					messageModal : true,
					message :{
						title: "Report Received",
						message: "Thank you for your feedback! One of our team memebers will look into this review as soon as possible!"
					}
				})
			}
		})
	}

	toggleReviewModal() {
		this.setState(state => { return {newReviewModal : !state.newReviewModal}});
	}

	toggleMessageModal(message) {
		this.setState(state => { return {messageModal : !state.messageModal, message}});
	}
	
	toggleQuestionModal() {
		this.setState(state => { return {questionModal : !state.questionModal}});
	}

	handleSubmitReview(review) {
		let id = this.state.product_id;
		let type = this.state.reviewSortType;
		// axios.post('http://localhost:3050/api/review', {...review, product_id: this.state.product_id}, {withCredentials: true})
		axios.post('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/review', {...review, product_id: this.state.product_id}, {withCredentials: true})
		.then(results =>{
			this.setState({
				messageModal : true,
				message: {
					title: results.data.title,
					message: results.data.message
				}
			})

			window.dispatchEvent(new CustomEvent('stars',{detail: {product_id: this.state.id}}));
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
				messageModal : true,
				message: {
					title: "Server error: " + err.response.data.err,
					message: "Sorry, we encountered the following error:\n\n" + err.response.data.message
				}
			})
		})
	}

	handleReviewSort(type) {
		let id = this.state.product_id;
		this.setState({reviewSortType : type}, () => {
			axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=0&type=${type}`, {withCredentials: true})
			.then(data => {this.setState({reviews : data.data.reviews, reviewCount: 10})})
		})
	}

	render() {
		const { descriptions, specs, reviews, questions, reviewCount, reviewStats, newReviewModal, messageModal } = this.state;
		return (
			<div className={`container ${styles.font}`}>
				<MessageModal show={messageModal} toggle={this.toggleMessageModal} message={this.state.message}/>
				<ReviewModal show={newReviewModal} close={this.toggleReviewModal} submit={this.handleSubmitReview}/>
				<QuestionModal show={newReviewModal} close={this.toggleReviewModal} submit={this.handleSubmitReview}/>
				<Accordion>
					<Description onClick={this.handleClick} descriptions={descriptions} />
					<Specifications onClick={this.handleClick} specs={specs} />
					<RatingsReviews
						onClick={this.handleClick}
						reviews={reviews}
						count={reviewCount}
						moreReviews={this.handleMoreReviews}
						stats={reviewStats}
						helpfulClick={this.handleHelpfulClick}
						newReview={this.toggleReviewModal}
						sort={this.handleReviewSort}
					/>
					<QuestionsAnswers onClick={this.handleClick} questions={questions} />
				</Accordion>
			</div>
		);
	}
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);
