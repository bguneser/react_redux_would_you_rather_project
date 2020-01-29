import { showLoading, hideLoading } from 'react-redux-loading';
import { fetchQuestions } from '../actions/questions';
import { fetchUsers } from '../actions/users';
import { getInitialData } from '../utils/api';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(fetchQuestions(questions));
      dispatch(fetchUsers(users));
      dispatch(hideLoading());
    });
  };
}
