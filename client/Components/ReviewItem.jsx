import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import main from '../styles/main.less';
import checks from '../styles/checks.less';
import styles from '../styles/RatingItem.less';
import stars from '../styles/stars.less';
import buttons from '../styles/buttons.less';
import signs from '../styles/signs.less';
import {  Modal } from 'react-bootstrap';

function ReviewItem(props) {
	let recommendedStatus =
		props.review.recommended === true ? (
			<div data='recommended data'>
				<span className={checks.checkMark} />
				<small>Recommended</small>
			</div>
		) : props.review.recommended === false ? (
			<div data='recommended data'>
				<span className={checks.crossMark} />
				<small>Not Recommended</small>
			</div>
		) : (
			<div />
		);
	const [textRef, setTextRef] = useState(null);
	const [showReadMore, setShowReadMore] = useState(false);
	const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);

	const toggleBoxLength = () => {
		if (textRef !== null) {
			if (textRef.clientHeight > 100 && !isReadMoreClicked) {
				textRef.classList.remove(styles.show);
				textRef.classList.add(styles.hide, styles.fadeout);
				setShowReadMore(true);
			}
			if (isReadMoreClicked) {
				textRef.classList.remove(styles.hide, styles.fadeout);
				textRef.classList.add(styles.show);
			}
		}
	};
	const toggleReadMore = () => {
		if (isReadMoreClicked) {
			setIsReadMoreClicked(false);
		} else {
			setIsReadMoreClicked(true);
		}
	};

	props.isExpanded ? toggleBoxLength() : '';

	let id = uuidv4();
	const [show, setShow] = useState(false);
	const [select, setSelect] = useState(0);
	const [mount, setMount] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = i => {
		setShow(true);
		setMount(i);
	};
	const handleModalMount = () => {
		setSelect(mount);
		setMount(null);
	};
	const handleChange = id => {
		setSelect(id);
	};

	const { title, rating, date, text, author, helpful, verifiedPurchaser, sweepstakesEntry, images, _id } = props.review;
	return (
		<>
			<>
				<Modal
					size='lg'
					aria-labelledby='contained-modal-title-vcenter'
					centered
					show={show}
					onShow={handleModalMount.bind(this)}
					onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
								{title}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className='row'>
							<div className='col-2 border-right'>
								{images.map((image, index) => {
									return (
										<div key={uuidv4()}>
											<img
												onClick={() => {
													handleChange(index);
												}}
												className={`${styles.TB} ${index === select ? styles.TBselect : ''}`}
												src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.smallName}.jpg`}
												alt='oops'
											/>
										</div>
									);
								})}
							</div>
							<div className='col-10'>
								{images.map((image, index) => {
									return (
										<div key={uuidv4()}>
											<img
												onClick={() => {
													handleChange(index);
												}}
												className={`${styles.fullIMG} ${index === select ? main.show : ''}`}
												src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.largeName}.jpg`}
												alt='oops'
											/>
										</div>
									);
								})}
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>

			<>
				<div className={`row ${styles.container}`}>
					<div className={`col-md-7 border-right ${styles.qBorder}`}>
						<h4>{title}</h4>
						<div data='star data'>
							<span className={stars[`stars${rating}`]} />
							<small className={styles.padLeft10}>{`Reviewed on ${date}`}</small>
						</div>
						{recommendedStatus}
						<div
							className={`${styles.textContainer}`}
							ref={input => {
								setTextRef(input);
							}}>
							<p className='text-muted'>{text}</p>
							{images ? (
								<>
									{images.map((image, index) => {
										return (
												<span key={uuidv4()}>
													<img
														onClick={() => {
															handleShow(index);
														}}
														data-select={index.toString()}
														className={styles.TB}
														src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.smallName}.jpg`}
														large-id={image.largeName}
														alt='oops'
													/>
												</span>
										);
									})}
								</>
							) : (
								<></>
							)}
						</div>

						{showReadMore ? (
							<div className={`text-primary font-weight-bold text-center ${styles.pointer}`}>
								<u
									onClick={() => {
										toggleReadMore();
									}}>
									{isReadMoreClicked ? 'Read Less' : 'Read More'}
								</u>
							</div>
						) : (
							<div />
						)}
					</div>
					<div className={`col-md-5 ${styles.reviewSide}`}>
						<p className='font-weight-bold'>{author}</p>
						{verifiedPurchaser ? (
							<div>
								<span className={checks.checkMark} />
								<small>Verfied Pruchaser</small>
							</div>
						) : (
							<></>
						)}
						{sweepstakesEntry ? (
							<div>
								<span className={checks.checkMark} />
								<small>Sweepstakes Entry</small>
							</div>
						) : (
							<></>
						)}
						{helpful ? (
							<>
								<p>Was this review helpful?</p>
								<div className='row'>
									<div onClick={()=>{props.helpfulClick(_id, 'yes', 'reviews')}} className={`col-md-5 col-4 text-center ${buttons.button} ${buttons.spaceLeft}`}>Yes({helpful.yes})</div>
									<div onClick={()=>{props.helpfulClick(_id, 'no', 'reviews')}} className={`col-md-5 col-4 text-center ${buttons.button} ${buttons.spaceLeft}`}>No({helpful.no})</div>
									<div onClick={()=>{props.helpfulClick(_id, 'report', 'reviews')}} className='col-sm-12 col-12 text-center mt-3'>
										<a>
											<span className={`${signs.flag} ${buttons.spaceLeft}`} />
											<span> Report</span>
										</a>
									</div>
								</div>{' '}
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		</>
	);
}

export default ReviewItem;
