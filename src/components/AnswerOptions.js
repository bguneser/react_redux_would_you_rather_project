import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button} from 'semantic-ui-react'
import { handleSaveQuestionAnswer } from '../actions/users'


export class AnswerOptions extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };
  state = {
    value: ''
  };

  handleChange = (e) => {
    const value = e.target.value;

    this.setState({
      value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(this.state.authedUser, question.id, this.state.value)
    }
  }

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false

    return (
      <Fragment>
        <h4>Would you rather</h4>
        <form className="ui form">
          
        <div className="field">
        <input
            type='radio'
            name='option'
            value='optionOne'
            onChange={this.handleChange}
            checked={this.state.value === 'optionOne'}
          />
          <span className='question-option'>{question.optionOne.text}</span>
          <br />
        </div>
        <div className="field">

          <input
            type='radio'
            name='option'
            value='optionTwo'
            onChange={this.handleChange}
            checked={this.state.value === 'optionTwo'}
          />
          <span className='question-option'>{question.optionTwo.text}</span>

          </div>
         
        <div className="field">
            <Button variant="contained" fluid color="primary" color="green"
              onClick={this.handleSubmit}
              disabled={disabled}>
              Submit
          </Button>
          </div>
      
          </form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }, { match }) {
  return {
    authedUser
  };
}
export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(AnswerOptions);

