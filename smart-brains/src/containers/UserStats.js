import { Component } from "react";
import StatCard from "../components/StatCard";
import './UserStats.css';

class UserStats extends Component {

    render() {

        return(
            <div className="user-stats-section">
                <StatCard name={"Your Rank"} value={this.props.userdetails.detect_count}></StatCard>
                <StatCard name={"Overall Detects"} value={this.props.userdetails.overall_detect}></StatCard>
                <StatCard name={"Overall Median"} value={this.props.userdetails.overall_median}></StatCard>
            </div>

        )
    }
}

export default UserStats