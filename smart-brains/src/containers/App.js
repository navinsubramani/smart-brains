import React, {Component} from "react";
import './App.css'

import SignIn from "./SignIn";
import Register from "./Register";

import Navigation from "./Navigation";
import UserStats from "./UserStats";
import SearchBar from "./SearchBar";
import FaceDetectedImage from "./FaceDetectedImage";



class Home extends Component {

    constructor() {
        super();
        this.state = {
            link: '',
            detectedRegions: [],
            route: "signin"
        }
    }

    onValueChangeLink = (events) => {
        let newLink = events.target.value
        console.log(newLink)
        this.setState(
            {
                link: newLink,
                detectedRegions: []
            }
        )
    }

    onDetectSubmit = (events) => {
        console.log('Detect Clicked')
        this.detectImage()
    }

    onRouteChange = (route) => {
        this.setState({
            link: '',
            detectedRegions: [],
            route: route
        })
    }

    render() {

        if (this.state.route === "signin") {
            return(
                <SignIn onRouteChange={this.onRouteChange}/>
            )
        }

        else if (this.state.route === "register") {
            return(
                <Register onRouteChange={this.onRouteChange}/>
            )
        }

        else {
            return (
                <div className="home-screen">
                    <Navigation onSignout={this.onRouteChange}/>
                    <UserStats />
                    <SearchBar onValueChange={this.onValueChangeLink} onButtonClick = {this.onDetectSubmit}/>
                    <FaceDetectedImage link={this.state.link} boundries={this.state.detectedRegions}/>
                    <div className="example-image">
                        <h3>Some Example Image Link</h3>
                        <a href="https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-three-men-sitting-in-van.jpg">
                            https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-three-men-sitting-in-van.jpg
                        </a>
                        <a href="https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-crowd-at-concert.jpg">
                            https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-crowd-at-concert.jpg
                        </a>
                        <a href="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
                            https://ik.imagekit.io/ikmedia/women-dress-2.jpg
                        </a>
                    </div>
                </div>
            )
        }
        
    }

    detectImage() {

        ///////////////////////////////////////////////////////////////////////////////////////////////////
        // In this section, we set the user authentication, user and app ID, model details, and the URL
        // of the image we want as an input. Change these strings to run your own example.
        //////////////////////////////////////////////////////////////////////////////////////////////////

        // Your PAT (Personal Access Token) can be found in the portal under Authentification
        const PAT = '0a0726a3e829489d8fb96e82b19e7c37';
        // Specify the correct user_id/app_id pairings
        // Since you're making inferences outside your app's scope
        const USER_ID = 'navinsubramani';       
        const APP_ID = 'zerotomastery';
        // Change these to whatever model and image URL you want to use
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
        const IMAGE_URL = this.state.link;

        ///////////////////////////////////////////////////////////////////////////////////
        // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
        ///////////////////////////////////////////////////////////////////////////////////

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result).outputs[0].data.regions)
        .then(regions => regions.map((region) => region.region_info.bounding_box))
        .then((boundries) => this.setState({detectedRegions: boundries}))
        .catch(error => console.log('error', error));

    }
}

export default Home