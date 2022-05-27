import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {loginAction} from '../actions'
import { NotificationManager } from "../components/common/react-notifications";

class Login extends Component {
  state = {
    email: '',
    password: '',
    done: false
  }

  // when navigating from Users to Login, the fields are auto filled, and jump back to Users again.
  // handleChange auto excuted. weird ???
  componentDidUnMount() {
    this.setState({email: '', password: ''})
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  /**
   * API calls has at least 2 cases:
   * success: action.type=SUCCESS
   * failure: action.type=FAILURE
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.loginAction(this.state)
      .then(data => {

        

      if(this.props.login.token != undefined){

        const token = this.props.login.token;
        if (token) {

          NotificationManager.success(
            "Succesfully logged in",
            "",
            1000,
            null,
            null,
            'filled'
          );
          this.setState({done: true})
          sessionStorage.setItem("userLoginToken", token)
          window.location.href='/list'
        }else{
          NotificationManager.error(
            this.props.login.data.message,
            "",
            1000,
            null,
            null,
            'filled'
          );
        }

      }else{
        NotificationManager.error(
          this.props.login.data.message,
          "",
          1000,
          null,
          null,
          'filled'
        );
      }

        
      })
  }

  //return <Users {...this.props.login} email={this.state.email}/>
  render() {
    const {email, loggedIn} = this.props.login;
    if (loggedIn && email && this.state.done) {
      return <Redirect to={`/users/${email}`}/>
    }
    return (
      <div className="login">
        <h1>Login <i className="fa fa-user"></i></h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}/>
          </FormGroup>

          <>&nbsp;</>

          <button type="submit" block className="button" disabled={!this.validateForm()}>
          Login
                    </button>

          {/* <Button
            block
            type="submit"
            disabled={!this.validateForm()}
            bsSize="large"
            bsStyle="danger"
          >Login <i className="fa fa-user"></i>
          </Button> */}
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({login: state.login}),
  {loginAction}
)(Login)

