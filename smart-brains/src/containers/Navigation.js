import React, {Component} from "react";
import './Navigation.css'

import Logo from "../components/Logo";
import logo_file from './../media/smart-brain.svg'

class Navigation extends Component {

    render() {
        return (
            
            <div className="bar">
                <Logo logo={logo_file} logo_alt="Smart Brains"/>
                <h1>Face Recognition</h1>
                <button 
                    className="button-3"
                    onClick={() => this.props.onSignout("signin")}
                >Logout</button>
            </div>
        )
    }
}

export default Navigation