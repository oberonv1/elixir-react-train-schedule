import React from "react";
import {connect} from "react-redux";


class Main extends React.Component {
    render() {
        const {visitors, schedule} = this.props;

        const scheduleHeadings = <tr>{schedule[0].split(',').map((heading, i) => <th key={i}>{heading}</th>)}</tr>;
        const processRow = row => row.split(',').map((cell, i) =>
            <td key={i}>{cell}</td>
        );
        const scheduleRows = schedule.slice(1).map((row,index) =>
            <tr key={index}>{processRow(row)}</tr>
        );

        return <main role="main">
            <div className="jumbotron">
                <h2>Welcome to North Station!</h2>
                <p className="lead"> Board will update every minute.
                </p>
            </div>

            <table className="table schedule-table">
                <thead>
                {scheduleHeadings}
                </thead>
                <tbody>
                {scheduleRows}
                </tbody>
            </table>

            <div className="row marketing">
                <div className="col-lg-12 col-lg-offset-4">
                    <h3>Visitors:</h3>
                </div>
            </div>
            <div className="row marketing">
                <div className="col-lg-4">
                    <h3>Total: {visitors.total}</h3>
                </div>
                <div className="col-lg-4">
                    <h3>Max. online: {visitors.max_online}</h3>
                </div>
                <div className="col-lg-4">
                    <h3>Online: {visitors.online}</h3>
                </div>
            </div>

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