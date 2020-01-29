import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Grid,
  Header,
  Image,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'
import LoginForm from'./LoginForm'

export class Signin extends Component {
  state = {
    loading: false
  }
  handleLoading = () => {
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginGridLayout
            image={<ApplicationMainImage />}
            form={<LoginFormConnection onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
        <footer className="footer">
          <a href="https://pixabay.com/">
            Avatars created by pixabay - https://pixabay.com/
          </a>
        </footer>
      </Fragment>
    );
  }
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={12}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const ApplicationMainImage = () => (
  <Image src="/images/logo192.png" size="medium" centered />
);

const LoginFormConnection = connect(
  mapStateToProps,
  { setAuthedUser }
)(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Signin;
