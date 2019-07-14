import React, { useState } from 'react';
import AnswerItem from './AnswerItem.jsx';
import uuidv4 from 'uuid/v4';
import styles from '../styles/QuestionItem.less';
import buttons from '../styles/buttons.less';

function QuestionItem(props) {
	const [questionRef, setQuestionRef] = useState();
	function toggleShow() {
		let rotateCaret = questionRef.querySelector(`span.${styles.downCaret}`).parentElement;
		if (questionRef.classList.contains(styles.show)) {
			questionRef.classList.remove(styles.show, styles.expand);
			rotateCaret.classList.remove(styles.rotateCaret);
		} else {
			questionRef.classList.add(styles.show, styles.expand);
			rotateCaret.classList.add(styles.rotateCaret);
		}
	}

	const { question, author, date, answers } = props.question;
	return (
		<div className={styles.questionHide} ref={input => setQuestionRef(input)}>
			<div
				onClick={() => {
					toggleShow();
				}}
				className={`row ${styles.pointer} ${styles.mt8}`}>
				<div className={`col-1 text-center down ${styles.pad16}`}>
					<span className={styles.downCaret} />
				</div>
				<div className='col-9'>
					<div className={`${styles.textLowes} font-weight-bold`}>{question}</div>
					<div className='ml-3'>
						<small className='text-muted'>
							{author} on {date}
						</small>
					</div>
				</div>
				<div className='col-2'>
					{answers.length ? (
						<div className='text-center'>
							<div className={styles.answerLength}>{answers.length}</div>
							<div>{answers.length > 1 ? 'Answers' : 'Answer'}</div>
							<span className={`${buttons.button} ${styles.answerButton}`}>ANSWER THIS QUESTION</span>
						</div>
					) : (
						<span className={`${buttons.button} ${styles.answerButton}`}>ANSWER THIS QUESTION</span>
					)}
				</div>
			</div>
			<div data='All Answers container'>
				{answers.length && answers.length > 1 ? (
					answers.map(answer => (
						<div key={uuidv4()}>
							<AnswerItem answer={answer} />
							<hr />
						</div>
					))
				) : answers.length === 1 ? (
					<AnswerItem answer={answers[0]} />
				) : (
					<div />
				)}
			</div>
		</div>
	);
}

export default QuestionItem;
