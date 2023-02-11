import { Component } from "react";
import './StatCard.css'

class StatCard extends Component {

    render() {

        return (
            <div className="card">
                <h3>{this.props.name}</h3>
                <h3>{this.props.value}</h3>
            </div>
        )
    }
}

export default StatCard