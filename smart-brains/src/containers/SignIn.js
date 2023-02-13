import { Component } from "react";
import './SignIn.css'

import Logo from "../components/Logo";
import logo_file from './../smart-brain.svg'

import 'tachyons'


class SignIn extends Component {

    constructor(props) {
        super(props)
        this.userID = ""
        this.password = ""
    }

    onEmailChange = (event) => {
        this.userID = event.target.value
    }

    onPasswordChange = (event) => {
        this.password = event.target.value
    }

    onSignin = () => {
        fetch(this.props.baseurl+'/signin',
        {
            method:'post',
            header: {
                'Contet-type':'text/json'
            },
            body: JSON.stringify({
                "userID": this.userID,
                "password": this.password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === true) {
                this.props.onSignIn(this.userID)
                this.props.onRouteChange('home')
            }
            else {
                alert(response.reason)
            }
        })
        .catch(console.log)
    }

    render() {

        return (
            <div className="main">
                <Logo logo={logo_file} logo_alt="Smart Brains"/>

                <main className="pa4 black-80 signin">
                    
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Email/User ID</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 input-box" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent w-100 input-box" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="button-3" 
                                type="submit" 
                                value="Sign in"
                                onClick={this.onSignin}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" 
                                className="f6 link dim black db"
                                onClick={() => this.props.onRouteChange('register')}
                            >Register</a>
                        </div>
                        <div className="warning">{this.props.connMessage}</div>
                    </div>
                </main>
            </div>
                
        )
    }
}

export default SignIn