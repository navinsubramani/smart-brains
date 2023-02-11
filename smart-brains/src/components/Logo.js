import { Component } from "react";
import './Logo.css'

class Logo extends Component {

    render() {
        let src_file_loc = this.props.logo
        let src_alt = this.props.logo_alt

        return (
                <img 
                    className="rotate"
                    src={src_file_loc} 
                    alt={src_alt}
                />
        )
    }
}

export default Logo