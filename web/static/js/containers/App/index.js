/**
 * Created by jonathan on 10/29/16.
 */
import React from "react";

export default class App extends React.Component {
    render() {
        return <div className="container">
            <header className="header">
                <div className="logo-container">
                    <span className="logo"></span>
                    <h1>MBTA</h1>
                </div>
            </header>
            {this.props.children}
        </div>;
    }
};