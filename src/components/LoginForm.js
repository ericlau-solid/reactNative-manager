import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Card, CardSection, TextField, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

export class LoginFormComponent extends Component {
  handleEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  handlePasswordChange = (pwd) => {
    this.props.passwordChanged(pwd);
  }

  handleLogin = () => {
    this.props.loginUser(this.props);
  }

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } 

    return (
      <Button onPress={this.handleLogin}>
        Login
      </Button>
    );
  }

  render() {
    const { email, password } = this.props;

    return (
      <Card>
        <CardSection>
          <TextField 
            label="Email" placeholder="email@gmail.com" 
            onChangeText={this.handleEmailChange}
            value={email}
          />
        </CardSection>
        <CardSection>
          <TextField 
            secureTextEntry 
            label="Password" placeholder="password" 
            onChangeText={this.handlePasswordChange}
            value={password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  }
};

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  password: auth.password,
  error: auth.error,
  loading: auth.loading,
});

export default connect(mapStateToProps, { 
  emailChanged, passwordChanged, loginUser,
})(LoginFormComponent);
