import React, {Component} from 'react'
import Hello from '../Hello'
import {connect} from 'react-redux'
import {signIn} from '../../AC/index'

class SignIn extends Component{

  state = {
    login: '',
    pass: ''
  };

  render() {
    const {user} = this.props;

    return(
      <div className='clearfix'>
        <form className="form-inline float-left" >
          <div className="form-group mb-2">
            <label className="sr-only">Email</label>
            <input type="text" className="form-control" placeholder="Login" onChange={this.handleChange('login')} value={this.state.login} />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange('pass')} value={this.state.pass} />
          </div>
          <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit} >Sign in</button>
        </form>

        <div className='float-right'>
          <Hello username={user.name}/>
        </div>

      </div>
    )
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { signIn } = this.props;
    if (this.state.login && this.state.pass) signIn(this.state)
  };

  handleChange = type => ev => {
    this.setState({
      [type]: ev.target.value
    })
  }
}

export default connect((state) => ({
  user: state.signin
}), {signIn})(SignIn);