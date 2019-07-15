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

class ProductDesc extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleMoreReviews = this.handleMoreReviews.bind(this);
		this.state = {
			descriptions: [],
			specs: [],
			reviews: [],
			reviewStats: {},
			reviewCount: 10,
			questions: [],
			_Pid: null
		};
	}

	componentDidMount() {

		window.addEventListener('product', e => {
			const id = e.detail.product_id;
			axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?review=0`).then(data => {
				if (data.data.reviewStats.reviewCount < 10) {
					this.setState({ ...data.data, reviewCount: data.data.reviewStats.reviewCount });
				} else {
					this.setState({ ...data.data, reviewCount: 10 });
				}
			});
		});

		axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/1?review=0`).then(data => {
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
		let id = this.state._Pid || 1;
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
							}`
						)
						.then(data => {
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

	render() {
		const { descriptions, specs, reviews, questions, reviewCount, reviewStats } = this.state;
		return (
			<div className={`container ${styles.font}`}>
				<Accordion>
					<Description onClick={this.handleClick} descriptions={descriptions} />
					<Specifications onClick={this.handleClick} specs={specs} />
					<RatingsReviews
						onClick={this.handleClick}
						reviews={reviews}
						count={reviewCount}
						moreReviews={this.handleMoreReviews}
						stats={reviewStats}
					/>
					<QuestionsAnswers onClick={this.handleClick} questions={questions} />
				</Accordion>
			</div>
		);
	}
}

let domContainer = document.querySelector('#productDesc');
ReactDOM.render(<ProductDesc />, domContainer);
