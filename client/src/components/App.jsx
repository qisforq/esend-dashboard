import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.jsx';
import Landing from './Landing.jsx';
import NotFound from './NotFound.jsx'
import Dashboard from './Dashboard.jsx'
import SendMoney from './SendMoney.jsx'
import TransactionReview from './TransactionReview.jsx'
const TransactionHistory = () => <h2>Transaction History</h2>



class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUsdMxnRate();
    this.props.updateSendAmount();
    console.log(this.props)
  }

  renderDashboard() {
    // check if user is logged in to decide whether to render Landing, or redirect to the dashboard
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return <Landing />;
      default:
        return <Redirect to='/dashboard'/>;
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
              <Switch>
                <Route exact path="/">{this.renderDashboard()}</Route>
                <Route path="/history" component={TransactionHistory} />
                <Route path="/dashboard" component={Dashboard} />
                <Route exact path="/send-money"><SendMoney /></Route>
                <Route path="/send-money/review" component={TransactionReview} />
                <Route path="/*" component={NotFound} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

function mapStateToProps({ auth }) {
  
  return { auth };
}

export default connect(mapStateToProps, actions)(App);