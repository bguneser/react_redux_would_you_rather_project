import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Menu,
  Responsive,
  Button,
  Container
} from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser'

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthedUser(null)
  }

  render() {
    const { authedUser, users } = this.props

    return (
      <Container>
        <Responsive as={Menu} minWidth={651} pointing secondary>

          <nav className='nav'>
            <ul>
              <li>
                <NavLink to='/' exact activeClassName='active'>
                  Home
          </NavLink>
              </li>
              <li>
                <NavLink to='/add' activeClassName='active'>
                  New Poll
          </NavLink>
              </li>
              <li>
                <NavLink to='/leaderboard' activeClassName='active'>
                  Leader Board
          </NavLink>
              </li>
            </ul>
          </nav>
          <div className="right menu">
            <div className="item">
              <span>
                <img src={users[authedUser].avatarURL}
                  className="ui avatar right spaced bottom aligned image" />
                {users[authedUser].name}
              </span>
            </div>
            <div className="item">
              <span>
                <Button
                  content="Logout"
                  labelPosition="right"
                  icon="lock"
                  onClick={this.handleLogout}
                />
              </span>
            </div>
          </div>
        </Responsive>
      </Container>
    )
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  }
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Navbar)
