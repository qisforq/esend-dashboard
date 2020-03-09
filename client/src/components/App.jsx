import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.jsx'

const Landing = () => <h2>Landing</h2>
const SendMoney = () => <h2>New Transaction</h2>
const TransactionHistory = () => <h2>Transaction History</h2>
const NotFound = () => {
  return (
    <div>
      <h1>Houston, we've got a problem</h1>
      <h2>We can't find the page you're looking for.</h2>
      <img src="https://www.transfast.com/~/media/Images/Errors/404" height="500"></img>
    </div>
  )
}


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/"><Landing /></Route>
              <Route path="/history" component={TransactionHistory} />
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