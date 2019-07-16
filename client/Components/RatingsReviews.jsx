import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import ReviewItem from './ReviewItem.jsx';
import main from '../styles/main.less';
import header from '../styles/CardHeader.less';
import { Accordion, Card } from 'react-bootstrap';
import signs from '../styles/signs.less';
import stars from '../styles/stars.less';
import styles from '../styles/Ratings.less';
import buttons from '../styles/buttons.less';

function RatingsReviews(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpanded = () => {
		if (isExpanded) {
			setIsExpanded(false);
		} else {
			setIsExpanded(true);
		}
	};
	function renderReviews() {
		let arr = [];
		for (let i = 0; i < props.count; i++) {
			arr.push(
				<div key={uuidv4()}>
					<ReviewItem key={uuidv4()} isExpanded={isExpanded} review={props.reviews[i]} helpfulClick={props.helpfulClick} />
					<hr />
				</div>
			);
		}
		return arr;
	}
	const signToggle = document.querySelector('span[data="toggleRatingsReviewsSign"]');
	const reviews = props.reviews.length ? renderReviews() : <div />;

	function cssAdjust(num) {
		num = Math.round(num * 2) / 2;
		num = num.toString().split('');
		num = !num[2] ? num[0] : `${num[0]}_${num[2]}`;
		return num;
	}

	let fiveWidthValue = props.stats.starCounts ? (props.stats.starCounts.five / props.stats.reviewCount) * 100 : 0;
	let fourWidthValue = props.stats.starCounts ? (props.stats.starCounts.four / props.stats.reviewCount) * 100 : 0;
	let threeWidthValue = props.stats.starCounts ? (props.stats.starCounts.three / props.stats.reviewCount) * 100 : 0;
	let twoWidthValue = props.stats.starCounts ? (props.stats.starCounts.two / props.stats.reviewCount) * 100 : 0;
	let oneWidthValue = props.stats.starCounts ? (props.stats.starCounts.one / props.stats.reviewCount) * 100 : 0;

	return (
		<Card>
			<Accordion.Toggle
				as={Card.Header}
				eventKey='2'
				className={`card-header ${header.header}`}
				onClick={() => {
					props.onClick(signToggle);
					toggleExpanded();
				}}>
				<span className={header.icon}>{'\uECE0 '}</span>
				<span className='text-white font-weight-bold'>Reviews and Ratings</span>
				<span data='toggleRatingsReviewsSign' className={`float-right ${signs.plusSign}`} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='2'>
				<Card.Body>
					<div className='container-fluid'>
						<h6 className='font-weight-bold'>Ratings Summary</h6>
						<div className='row'>
							<div className={`col-md-6 col-lg-2 text-center ${styles.greyBG}`} style={{ padding: '16px' }}>
								<h2 className='font-weight-bold'>{props.stats.percentRecommended}%</h2>
								<div className='font-weight-bold'>Recommended this product</div>
								<div>of {props.stats.reviewCount} reviews</div>
							</div>
							<div className={`col-md-6 col-lg-2 text-center ${styles.pad16}`}>
								<div>{props.stats.reviewCount} Ratings</div>
								<div className={stars[`stars${cssAdjust(props.stats.averageStars)}`]} />
								<small>{props.stats.averageStars} Average</small>
							</div>
							<div className={`col-md-12 col-lg-6 ${styles.totalByStars}`}>
								<div className={`row no-gutters ${styles.starStats}`} >
									<div className='col-2'>
										<div className={stars.stars5} />
									</div>
									<div className='col-8 col-sm-9 col-md-10'>
										<div className='progress'>
											<div
												className={`progress-bar ${styles.lowesBG}`}
												role='progressbar'
												style={{
													width: `${fiveWidthValue}%`
												}}>
												{props.stats.starCounts ? props.stats.starCounts.five : 0}
											</div>
										</div>
									</div>
								</div>
								<div className={`row no-gutters ${styles.starStats}`} >
									<div className='col-2'>
										<div className={stars.stars4} />
									</div>
									<div className='col-8 col-sm-9 col-md-10'>
										<div className='progress'>
											<div
												className={`progress-bar ${styles.lowesBG}`}
												role='progressbar'
												style={{
													width: `${fourWidthValue}%`
												}}
												aria-valuenow='89'
												aria-valuemin='0'
												aria-valuemax='100'>
												{props.stats.starCounts ? props.stats.starCounts.four : 0}
											</div>
										</div>
									</div>
								</div>
								<div className={`row no-gutters ${styles.starStats}`} >
									<div className='col-2'>
										<div className={stars.stars3} />
									</div>
									<div className='col-8 col-sm-9 col-md-10'>
										<div className='progress'>
											<div
												className={`progress-bar ${styles.lowesBG}`}
												role='progressbar'
												style={{
													width: `${threeWidthValue}%`
												}}
												aria-valuenow='89'
												aria-valuemin='0'
												aria-valuemax='100'>
												{props.stats.starCounts ? props.stats.starCounts.three : 0}
											</div>
										</div>
									</div>
								</div>
								<div className={`row no-gutters ${styles.starStats}`} >
									<div className='col-2 col-sm-2'>
										<div className={stars.stars2} />
									</div>
									<div className='col-8 col-sm-9 col-md-10'>
										<div className='progress'>
											<div
												className={`progress-bar ${styles.lowesBG}`}
												role='progressbar'
												style={{
													width: `${twoWidthValue}%`
												}}
												aria-valuenow='89'
												aria-valuemin='0'
												aria-valuemax='100'>
												{props.stats.starCounts ? props.stats.starCounts.two : 0}
											</div>
										</div>
									</div>
								</div>
								<div className={`row no-gutters ${styles.starStats}`} >
									<div className='col-2'>
										<div className={stars.stars1} />
									</div>
									<div className='col-8 col-sm-9 col-md-10'>
										<div className='progress'>
											<div
												className={`progress-bar ${styles.lowesBG}`}
												role='progressbar'
												style={{
													width: `${oneWidthValue}%`
												}}
												aria-valuenow='89'
												aria-valuemin='0'
												aria-valuemax='100'>
												{props.stats.starCounts ? props.stats.starCounts.one : 0}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={`col-md-12 col-xl-2 justify-content-center text-center ${main.wrapper}`}>
								<span onClick={props.newReview} className={`${main.content} ${buttons.button}`}>WRITE A REVIEW</span>
							</div>
						</div>
					</div>
					<div
						className={`row ${styles.greyBG} ${styles.containerStrip}`}>
						<h3 className='col-sm-6'>{props.stats.reviewCount} Reviews</h3>
						<div className='col-sm-6'>
							<select onChange={(e) => props.sort(e.target.value) } className={styles['select-box']} name='sortReviewBy' id='sortReviewBy'>
								<option defaultValue=''>Most Relevant</option>
								<option value='newest'>Newest to Oldest</option>
								<option value='oldest'>Oldest to Newest</option>
								<option value='highest'>Highest to Lowest Rating</option>
								<option value='lowest'>Lowest to Highest Rating</option>
							</select>
						</div>
					</div>
					<div data='all the reviews'>{reviews}</div>
					{props.count !== props.stats.reviewCount ? (
						<div
							onClick={() => {
								props.moreReviews();
							}}
							className={buttons.button}>
							Read {props.stats.reviewCount - props.count < 10 ? props.stats.reviewCount - props.count : 10} More
						</div>
					) : (
						<></>
					)}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default RatingsReviews;
