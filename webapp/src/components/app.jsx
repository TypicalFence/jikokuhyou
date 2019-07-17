import React from "react";
import {
    BrowserRouter as Router, Route, Link, Switch,
} from "react-router-dom";
import Test from "./test";

const root = () => (
    <div>
        <h1>Root Route</h1>
        <Link to="/hello">hello</Link>
    </div>
);


const hello = () => (
    <div>
        <h1>Hello Route</h1>
        <Link to="/">root</Link>
    </div>
);


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={root} />
                        <Route path="/hello" component={hello} />
                        <Route path="/typescript" component={Test} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
