import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Calculator from './Calculator.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Dashboard = (props) => {
    const userLoggedIn = !!props.userInfo
    if (userLoggedIn) {
      return (
          <Container >
            <Row><br /></Row>
            <Row>
              <Col>
                <h2>Dashboard</h2>
              </Col>
              <Col xs={{ span: 4 }}>
                <h5>{`Welcome, ${props.userInfo.first_name}`}</h5>
              </Col>
            </Row>
            <Row><br/></Row>
            <Row>
              <Col></Col>
              <Col xs="auto">
                <Calculator />
              </Col>
              <Col></Col>
            </Row>
            <Row><br/></Row>
            <Row>
              &nbsp; &nbsp;
              <Link to={'/history'}><Button variant="dark">Transaction History</Button></Link>
            </Row>
          </Container>
      )
    } else {
      return (
      <Container >
        <Row><br /></Row>
        <Row>
          <Col>
            <h2>Dashboard</h2>
          </Col>
        </Row>
      </Container>
      )
    }
}


function mapStateToProps(state) {
  return { userInfo: state.auth };
}

export default connect(mapStateToProps)(Dashboard);