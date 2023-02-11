import { Component } from "react";
import './FaceDetectedImage.css'


class FaceDetectedImage extends Component {

    render() {

        if (this.props.link.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            let boxs = []
            let top = 0
            let bottom = 0
            let left = 0
            let right = 0

            if (this.props.boundries.length) {

                const image = document.getElementById("faceImage")
                const w = Number(image.width)
                const h = Number(image.height)

                boxs = this.props.boundries.map(
                    (boundry, i) => {
                        top = h*boundry.top_row
                        bottom = h - (h*boundry.bottom_row)
                        left = w*boundry.left_col
                        right = w - (w*boundry.right_col)

                        return (<div className="boundryBox" key={i} style={{top:top, right: right, left:left, bottom:bottom}}></div>)
                    }
                )

                //console.log(w, h, boxs)
                return(
                    <div className="FaceDetectedImage faceDetected">
                        <img 
                            id="faceImage"
                            className="image"
                            src={this.props.link} 
                            alt="For face Recognition"
                        ></img>
                        <div>
                            {boxs} 
                        </div>
                                               
                    </div>
        
                )
            }

            else {
                return(
                    <div className="FaceDetectedImage noFaceDetected">
                        <img 
                            id="faceImage"
                            className="image"
                            src={this.props.link} 
                            alt="For face Recognition"
                        ></img>
                    </div>
        
                )

            }
            


        }

        else {
            return(
            <div>
                <p></p>
            </div>
            )
        }
        


    }
}

export default FaceDetectedImage