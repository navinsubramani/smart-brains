import { Component } from "react";
import './SignIn.css'
import 'tachyons'

import Logo from "../components/Logo";
import logo_file from './../media/smart-brain.svg'

class Register extends Component {

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
                                    <input className="pa2 input-reset ba bg-transparent w-100 input-box" type="user-name" name="user-name"  id="user-name"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 input-box" type="email" name="email-address"  id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent w-100 input-box" type="password" name="password"  id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                    className="button-3" 
                                    type="submit" 
                                    value="Register"
                                    onClick={() => this.props.onRouteChange('signin')}
                                />
                            </div>
                        </div>
                    </main>
            </div>
        )
    }
}

export default Register