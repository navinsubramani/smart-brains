import { Component } from "react";
import './SignIn.css'
import 'tachyons'

import Logo from "../components/Logo";
import logo_file from 'https://github.com/navinsubramani/smart-brains/blob/main/smart-brains/src/smart-brain.svg'

class Register extends Component {

    constructor(props) {
        super(props)
        this.username = ""
        this.userid = ""
        this.password = ""
    }

    onUsernameChange = (event) => {
        this.username = event.target.value
    }

    onUseridChange = (event) => {
        this.userid = event.target.value
    }

    onPasswordChange = (event) => {
        this.password = event.target.value
    }

    onRegister = () => {
        fetch(this.props.baseurl+'/register',
        {
            method:'post',
            header: {
                'Contet-type':'text/json'
            },
            body: JSON.stringify({
                "userName": this.username,
                "userID": this.userid,
                "password": this.password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === true) {
                alert("Registration Successfull")
                this.props.onRouteChange('signin')
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
                                <legend className="f4 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" for="user-name">User Name</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 input-box" type="user-name" name="user-name"  id="user-name" onChange={this.onUsernameChange}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" for="email-address">Email/User ID</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 input-box" type="email" name="email-address"  id="email-address" onChange={this.onUseridChange}/>
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
                                    value="Register"
                                    onClick={this.onRegister}
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <a href="#0" 
                                    className="f6 link dim black db"
                                    onClick={() => this.props.onRouteChange('signin')}
                                >Signin</a>
                            </div>
                            <div className="warning">{this.props.connMessage}</div>
                        </div>
                    </main>
            </div>
        )
    }
}

export default Register