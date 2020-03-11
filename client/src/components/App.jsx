import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Container from 'react-bootstrap/Container'

import Header from './Header.jsx';
import Landing from './Landing.jsx';
import NotFound from './NotFound.jsx'
import Dashboard from './Dashboard.jsx'
const SendMoney = () => <h2>New Transaction</h2>
const TransactionHistory = () => <h2>Transaction History</h2>



class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
              <Switch>
                <Route exact path="/"><Landing /></Route>
                <Route path="/history" component={TransactionHistory} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/mexico/send-money"><SendMoney /></Route>
                <Route path="/*" component={NotFound} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
};
export default connect(null, actions)(App);