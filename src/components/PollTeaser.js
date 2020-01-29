import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { colors } from '../utils/helpers'

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };
  state = {
    viewPoll: false
  }
  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }))
  }
  render() {
    const { question, unanswered } = this.props
    const btnColor = unanswered === true ? colors.green : colors.blue
    const btnContent = unanswered === true ? 'Answer Poll' : 'Results'

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />
    }
    return (
      <Fragment>
        <h5 >
          Would you rather
        </h5>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          color={btnColor.name}
          size="tiny"
          fluid
          onClick={this.handleClick}
          content={btnContent}
        />
      </Fragment>
    );
  }
}

export default PollTeaser;
