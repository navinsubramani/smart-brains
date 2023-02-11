import { Component } from "react";
import './SearchBar.css'

class SearchBar extends Component {

    
    render() {

        return(
            
            <div className="SearchBar">
                
                <input 
                    className="search-text" 
                    type="text" 
                    placeholder="Image link, please..."
                    onChange={this.props.onValueChange}
                ></input>

                <button 
                    className="detect-btn"
                    onClick={this.props.onButtonClick}
                >Detect</button>

            </div>
        )
    }

    
}

export default SearchBar