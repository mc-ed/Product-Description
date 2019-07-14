import React from 'react';
import uuidv4 from 'uuid/v4';
import header from '../styles/CardHeader.less';
import QuestionItem from './QuestionItem.jsx';
import { Accordion, Card } from 'react-bootstrap';
import signs from '../styles/signs.less';
import styles from '../styles/QuestionsAndAnswers.less';
import buttons from '../styles/buttons.less';

function QuestionsAnswers(props) {
	const signToggle = document.querySelector('span[data="toggleQuestionAndAnswerSign"]');

	return (
		<Card>
			<Accordion.Toggle
				as={Card.Header}
				eventKey='3'
				className={`card-header ${header.header}`}
				onClick={() => {
					props.onClick(signToggle);
				}}>
				<span className={header.icon}>{'\uEAC6 '}</span>
				<span className='text-white font-weight-bold'>Community Q & A</span>
				<span data='toggleQuestionAndAnswerSign' className={`float-right ${signs.plusSign}`} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='3'>
				<Card.Body>
					<div className='row'>
						<div className='col-2 text-center'>
							<div className={styles.questionsNo}>{props.questions.length}</div>
							<div>Question{props.questions.length > 1 ? 's' : ''}</div>
						</div>
						<div className='col-8'>
							<div className='font-weight-bold'>Search All Questions</div>
							<input className={styles.input} type='text' />
							<span className={buttons.button}>Search</span>
						</div>
						<div className='col-2'>
							<div className={buttons.button}>ASK A QUESTION</div>
						</div>
					</div>
					<div className={`${styles.greyBG} ${styles.selectBar}`}>
						<select className={`float-right ${styles.select}`} name='sortQuestions' id='sortQuestions'>
							<option defaultValue='MOST ANSWERED'>MOST ANSWERED</option>
							<option defaultValue='Newest to Oldest'>Newest to Oldest</option>
							<option defaultValue='Oldest to Newest'>Oldest to Newest</option>
							<option defaultValue='Answers Needed'>Answers Needed</option>
							<option defaultValue='Most Recently Answered'>Most Recently Answered</option>
						</select>
					</div>
					<div data='All questions container'>
						{props.questions.length && props.questions.length > 1 ? (
							props.questions.map(question => (
								<div key={uuidv4()}>
									<QuestionItem question={question} />
									<hr />
								</div>
							))
						) : props.questions.length === 1 ? (
							<QuestionItem question={props.questions[0]} />
						) : (
							<></>
						)}
					</div>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default QuestionsAnswers;
