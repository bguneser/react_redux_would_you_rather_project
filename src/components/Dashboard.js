import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'semantic-ui-react'
import Card from './Card'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

export class Dashboard extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };
  render() {
    const { userQuestionData } = this.props

    return <Tab panes={panes({ userQuestionData })} className="tab" />;
  }
}

const panes = props => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <div>
            {userQuestionData.answered.map(q => (
            <Card
              key={q.id}
              question_id={q.id}
              unanswered={true}
            />
          ))}
        </div>
        
      )
    },
    {
      menuItem: 'Answered',
      render: () => (

        <div>
          <Grid>
          {userQuestionData.unanswered.map(q => (
            <Card
              key={q.id}
              question_id={q.id}
              unanswered={false}
            />
          ))}
          </Grid>
        </div>

      )
    }
  ];
};

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers)
  const unanswered = Object.values(questions)
    .filter(q => answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp)
    const answered = Object.values(questions)
    .filter(q => !answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp)

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}
export default connect(mapStateToProps)(Dashboard);