import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
} from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
class LoginForm extends Component {
  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };
  state = {
    value: ''
  }
  onChange = (e, { value }) => {
    this.setState({ value })
  };
  handleSubmit = e => {
    e.preventDefault()
    const { setAuthedUser, onLoading } = this.props;
    const authedUser = this.state.value;

    new Promise((resolved, rejected) => {
      onLoading()
      setTimeout(() => resolved(), 500)
    }).then(() => setAuthedUser(authedUser))
  }
  createDropdownData = () => {
    const { users } = this.props

    return users.map(user => ({
      text: user.name,
      key: user.id,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }))
  }
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false
    const { users } = this.props

    return (
      <div>
        <Form >
          <h2  className="ui green header">
            Sign In
          </h2>
          <Form.Dropdown
            placeholder="Select a Person"
            value={value}
            fluid
            scrolling
            selection
            options={this.createDropdownData()}
            onChange={this.onChange}
            required
          />
      
          <Button variant="contained" color="primary"
            onClick={this.handleSubmit}
            disabled={disabled}>
            Login
          </Button>
          </Form>

      </div>

    );
  }
}

export default LoginForm 