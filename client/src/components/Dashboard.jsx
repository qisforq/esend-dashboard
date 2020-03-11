import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Calculator from './Calculator.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Dashboard extends Component {
  renderContent() {
    const userLoggedIn = !!this.props.userInfo
    if (userLoggedIn) {
      return (
          <Container >
            <Row><br /></Row>
            <Row className="justify-content-end">
              <h4>{`Welcome, ${this.props.userInfo.first_name}`}</h4>
            </Row>
            <Row>
              <Col></Col>
              <Col xs="auto">
                <Calculator />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Link to={'/mexico/send-money'}>
                <Button variant="dark">Send Money</Button>
              </Link>
              &nbsp; &nbsp;
              <Link to={'/history'}>
                <Button variant="dark">Transaction History</Button>
              </Link>
            </Row>
          </Container>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}


function mapStateToProps(state) {
  return { userInfo: state.auth };
}

export default connect(mapStateToProps)(Dashboard);