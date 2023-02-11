import { Component } from "react";
import StatCard from "../components/StatCard";
import './UserStats.css';

class UserStats extends Component {

    render() {

        return(
            <div className="user-stats-section">
                <StatCard name={"Your Rank"} value={"#5"}></StatCard>
                <StatCard name={"Overall Detects"} value={"#205"}></StatCard>
                <StatCard name={"Overall Median"} value={"#10"}></StatCard>
            </div>

        )
    }
}

export default UserStats