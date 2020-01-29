import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function addQuestionAnswer(authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch,getState )=> {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({ 
      optionOneText, optionTwoText, author: authedUser })
      .then(question => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question))
      }
    ).then(() => dispatch(hideLoading()))
  }
}
