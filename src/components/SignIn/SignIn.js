import React, { Component } from 'react';
import './SignIn.css';


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }

    onSubmitSignIn = () => {
        // console.log(this.state) //test that i have access to whatever i entered in register/password form
        fetch('http://localhost:3001/signin', {
            method: 'post', 
            headers: {'Content-type': 'Application/json'},
            body: JSON.stringify({ email: this.state.signInEmail, password: this.state.signInPassword})
        }).then(response => response.json()).then(data => { 
            if (data === 'success') {
                this.props.onRouteChange('home');
                console.log('success')
            } else {
                alert('wrong Email or Password')
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="main br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="z-1 pa4 bg-dark pv3 ba">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Login</legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                onChange={this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address" />
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" 
                                />
                            </div>

                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                        </fieldset>

                        <div className="">
                            <input 
                            onClick={ this.onSubmitSignIn } 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Login" 
                            />
                        </div>

                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="pointer f6 link dim black db">Register</p>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;