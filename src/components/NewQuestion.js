import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Segment,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleAddQuestion } from '../actions/questions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export class NewQuestion extends Component {
  static propTypes = {
    handleAddQuestion: PropTypes.func.isRequired,
    authedUser: PropTypes.string.isRequired,

  };
  state = {
    toHome: false,
    isLoading: false,
    optionOne: '',
    optionTwo: ''
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };
  handleSubmit = e => {
    e.preventDefault();
    const { handleAddQuestion } = this.props;
    const { optionOne, optionTwo } = this.state

    new Promise((res, rej) => {
      this.setState({ isLoading: true })
      handleAddQuestion(optionOne, optionTwo)
      setTimeout(() => res('success'), 1500)
    }).then(() => {
      this.setState({
        optionOne: '',
        optionTwo: ''
      });
      this.setState({ toHome: true })
    });
  };
  render() {
    const disabled = this.state.optionOne === '' || this.state.optionTwo === ''
    const { optionOne, optionTwo, toHome } = this.state
    if (toHome) {
      return <Redirect to="/" />;
    }
    return (
      <Segment.Group>
        <h4>
          Create a New Poll
        </h4>
        <div className="ui padded grid">
          <div className="column">
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form >

              <TextField
                id="optionOne"
                type="text"
                label="Option One"
                defaultValue={optionOne}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                autoFocus
              />

              <Divider horizontal>Or</Divider>
              <TextField
                id="optionTwo"
                type="text"
                label="Option Two"
                defaultValue={optionTwo}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary"
                onClick={this.handleSubmit}
                disabled={disabled}
                fullWidth
              >
                Submit
          </Button>
            </Form>
          </div>
        </div>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(
  mapStateToProps,
  { handleAddQuestion }
)(NewQuestion);
