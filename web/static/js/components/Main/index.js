import React from "react";
import moment from "moment";
import {connect} from "react-redux";

const processCell = (cell, index) => {
    if (index === 3) { //Scheduled time
        return moment.unix(parseInt(cell)).format('h:mm A');
    }
    else if (index === 4) { //Lateness (in seconds)
        return cell === '0' ? 'ON TIME' : parseInt(cell) / 60 + 'minutes late';
    }
    else if (index === 5) { //Track
        return cell === '' || cell === undefined ? 'TBD' : cell.replace(/"/g, '');
    }
    else {
        return cell.replace(/"/g, '');
    }
};

const processHeading = (heading, index) => {
    if(index === 3) {
        return 'Scheduled Arrival';
    }
    else {
        return heading;
    }
};

class Main extends React.Component {
    render() {
        const {visitors, schedule} = this.props;

        const currentTime = moment.unix(parseInt(schedule[1].split(',')[0])).format('ddd, MMM D YYYY, h:mm:ss A');
        //slice the first element of every row because we don't need timestamp
        const scheduleHeadings = <tr>{schedule[0].split(',').slice(1).map((heading, i) =>
            <th key={i}>{processHeading(heading,i)}</th>
        )}</tr>;
        const processRow = row => row.split(',').slice(1).map((cell, i) =>
            <td key={i}>{processCell(cell, i)}</td>
        );
        const scheduleRows = schedule.slice(1).map((row, index) =>
            <tr key={index}>{processRow(row)}</tr>
        );

        return <main role="main">
            <div className="jumbotron">
                <h2>Welcome to the Live MBTA Train Tracker!</h2>
                <p className="lead"> Board will update every minute.
                </p>
                <div className="row text-center">
                    <h3>Last Updated:</h3>
                    <p className="current-time schedule-table">{currentTime}</p>
                </div>
                <div className="row text-center">
                    <div className="col-lg-12">
                        <h3>Visitors:</h3>
                    </div>
                </div>
                <div className="row">
                    <p className="current-time schedule-table">Total: {visitors.total}</p>
                    <p className="current-time schedule-table">Max. online: {visitors.max_online}</p>
                    <p className="current-time schedule-table">Online: {visitors.online}</p>
                </div>
            </div>

            <table className="table schedule-table">
                <thead>
                {scheduleHeadings}
                </thead>
                <tbody>
                {scheduleRows}
                </tbody>
            </table>

        </main>;
    }
}

const mapStateToProps = state => {
    return {
        visitors: state.visitors,
        schedule: state.schedule
    };
};
export default connect(mapStateToProps)(Main);