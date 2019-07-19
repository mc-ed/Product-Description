import React, {useState} from 'react';
import uuidv4 from 'uuid/v4';
import header from '../styles/CardHeader.less';
import QuestionItem from './QuestionItem.jsx';
import { Accordion, Card } from 'react-bootstrap';
import signs from '../styles/signs.less';
import styles from '../styles/QuestionsAndAnswers.less';
import buttons from '../styles/buttons.less';

function QuestionsAnswers(props) {
	const signToggle = document.querySelector('span[data="toggleQuestionAndAnswerSign"]');

	const [search, setSearch] = useState('');
	
	function clearSearch() {
		setSearch('');
		props.search('');
	}

	return (
		<Card id='CommunityQandA'>
			<Accordion.Toggle
				id='EvelynClickHere'
				as={Card.Header}
				eventKey='3'
				className={`card-header ${header.header}`}
				onClick={() => {
					props.toggle(signToggle);
				}}>
				<span className={header.icon}>{'\uEAC6 '}</span>
				<span className='text-white font-weight-bold'>Community Q & A</span>
				<span data='toggleQuestionAndAnswerSign' className={`float-right ${signs.plusSign}`} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='3'>
				<Card.Body>
					<div className='row no-gutters'>
						<div className={`col-md-2 text-center ${styles.totalWrap}`}>
							<div className={styles.questionsNo}>{props.questions.length}</div>
							<div>Question{props.questions.length > 1 ? 's' : ''}</div>
						</div>
						<div className={`col-md-8 ${styles.searchBar}`}>
							<div className='font-weight-bold'>Search All Questions</div>
							<div className="row no-gutters">
							<input onChange={(e)=> {setSearch(e.target.value)}} value={search} className={styles.input} type='text' />
							<span onClick={()=>{props.search(search)}} className={`${buttons.button} ${styles.searchButton}`}>Search</span>
							<div onClick={clearSearch} className={`${styles.cross} ${search.length ? styles.showX : ''}`}>{'\u0049'}</div>
							</div>
						</div>
						<div className={`col-lg-2 ${styles.askQuestion}`}>
							<div onClick={() =>props.newQuestion('question')} className={buttons.button}>ASK A QUESTION</div>
						</div>
					</div>
					<div className={`${styles.greyBG} ${styles.selectBar}`}>
						<select onChange={(e) => props.sort(e.target.value) } className={`float-right ${styles.select}`} name='sortQuestions' id='sortQuestions'>
							<option value="default" defaultValue='default'>MOST ANSWERED</option>
							<option value='newest'>Newest to Oldest</option>
							<option value='oldest'>Oldest to Newest</option>
							<option value='needed'>Answers Needed</option>
							<option value='recentlyAnswered'>Most Recently Answered</option>
						</select>
					</div>
					<div data='All questions container'>
						{props.questions.length && props.questions.length > 1 ? (
							props.questions.map(question => (
								<div key={uuidv4()}>
									<QuestionItem question={question} helpfulClick={props.helpfulClick} />
									<hr />
								</div>
							))
						) : props.questions.length === 1 ? (
							<QuestionItem question={props.questions[0]} helpfulClick={props.helpfulClick} />
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
