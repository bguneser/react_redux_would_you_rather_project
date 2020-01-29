import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Signin from './Signin';
import NewQuestion from './NewQuestion';
import Navbar from './Navbar';
import Error from './Error';
import Leaderboard from './Leaderboard';
import Card from './Card';


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">

          {this.props.authedUser === null ? (
            <Route
              render={() => (
                <GridContainer>
                  <Signin />
                </GridContainer>
              )}
            />
          ) : (
            <Fragment>
              <Navbar />
              <GridContainer>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/questions/:question_id" component={Card} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/questions/bad_id" component={Error} />
                  <Route component={Error} />
                </Switch>
              </GridContainer>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const GridContainer = ({ children }) => (
  <div className="ui centered vertically padded one column grid">
    <div className="row">
      <div className="column" style={{ maxWidth: 450 }}>{children}</div>
    </div>
  </div>
);

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
