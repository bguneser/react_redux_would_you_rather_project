import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Label,
  Divider
} from 'semantic-ui-react';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';


const trophyColor = ['yellow', 'grey', 'orange'];

export class Leaderboard extends Component {
  static propType = {
    leaderboardValues: PropType.array.isRequired
  };
  render() {
    const { leaderboardValues } = this.props;

    return (
      <Fragment>
        {leaderboardValues.map((user, idx) => (
          <Segment.Group key={user.id}>
            <Label corner="left" icon="trophy" color={trophyColor[idx]} />
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4} verticalAlign="middle">
                  <Avatar alt={user.name + ' profile picture'} src={user.avatarURL}></Avatar>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Header as="h3" textAlign="left">
                    {user.name}
                  </Header>
                  <Grid>
                    <ListItemText secondary={
                      <span>
                        <span>Answered Questions: {user.answeredQuestionCount}</span>
                        <Divider />
                        <span>Created Questions: {user.questionCount}</span>
                      </span>
                    } />
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  <Segment.Group>
                    <Header as="h4" block attached="top" content="Score" />
                    <Segment>
                      <Label circular color="green" size="medium">
                        {user.questionCount + user.answeredQuestionCount}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardValues = Object.values(users)
    .map(user => ({
      id: user.id,
      avatarURL: user.avatarURL,
      name: user.name,
      questionCount: user.questions.length,
      answeredQuestionCount: Object.values(user.answers).length,
      userQuestionAndAnsweredQuestion: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.userQuestionAndAnsweredQuestion - b.userQuestionAndAnsweredQuestion)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardValues
  };
}

export default connect(mapStateToProps)(Leaderboard);
