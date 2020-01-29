import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Progress,
  Label,
  Button,
  Icon
} from 'semantic-ui-react'
import { styles } from '../utils/helpers'

const VoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
)

export class PollResult extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  handleClick = () => {
    this.props.history.push('/')
  }

  render() {
    const { question, user } = this.props

    let option1 = styles.secondary,
      option2 = styles.secondary
    if (question.optionOne.votes.length > question.optionTwo.votes.length) {
      option1 = styles.primary
    } else if (question.optionTwo.votes.length > question.optionOne.votes.length) {
      option2 = styles.primary
    }

    return (
      <Fragment>
        <h3>
          Results:
          <div className="sub header" style={{ fontWeight: 'bold' }}>
            Would you rather
          </div>
        </h3>
        <div className="ui segment"
          color={option1.color}
          style={{ backgroundColor: `${option1.bgColor}` }}
        >
          {user.answers[question.id] === 'optionOne' && <VoteLabel />}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent={((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2)}
            progress
            color={option1.color}
          >
            {question.optionOne.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
          </Progress>
        </div>
        <div className="ui segment"
          color={option2.color}
          style={{ backgroundColor: `${option2.bgColor}` }}
        >
          {user.answers[question.id] === 'optionTwo' && <VoteLabel />}

          <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
          <Progress
            percent={((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2)}
            progress
            color={option2.color}
          >
            {question.optionTwo.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
          </Progress>
        </div>
        <Button size="tiny" floated="right" onClick={this.handleClick}>
          Back
        </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser]
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
