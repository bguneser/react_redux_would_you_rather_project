import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AnswerOptions from './AnswerOptions';
import PollResult from './PollResult';
import PollTeaser from './PollTeaser';
import { colors } from '../utils/helpers';

const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  ANSWER_OPTIONS: 'ANSWER_OPTIONS',
  POLL_RESULT: 'POLL_RESULT'
};

const PollContent = props => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <PollTeaser question={question} unanswered={unanswered} />;
    case pollTypes.ANSWER_OPTIONS:
      return <AnswerOptions question={question} />;
    case pollTypes.POLL_RESULT:
      return <PollResult question={question} />;
    default:
      return;
  }
};

export class Card extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    pollType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  };
  render() {
  
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null
    } = this.props;

    console.log(unanswered)

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    const tabColor = unanswered === true ? colors.green : colors.blue;
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`;

    return (
      <div className="ui segment">
        <h5
          style={{ border: borderTop, textAlign: "left", fontStyle: "italic" }}
        >
          {author.name} asks:
        </h5>

        <div className="ui divided">
          <div className="ui internally celled grid">
            <div className="four wide column">
              <img className ="ui image"src={author.avatarURL} />
            </div>
            <div className="twelve wide column">
              <PollContent
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authedUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.ANSWER_OPTIONS;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  };
}

export default connect(mapStateToProps)(Card);
