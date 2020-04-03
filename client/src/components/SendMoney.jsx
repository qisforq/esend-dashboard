import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
// import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';



const SendMoney = (props) => {
  console.log("props:",props)
  return (
    <Container>
      <Row><br/></Row>
      <Row>
        <h2>New Transaction</h2>
      </Row>
      <Row>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs="6">
              Send Amount:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={`${props.sendAmount.toFixed(2)} USD`} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="6">
              Receive Amount:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={`${props.sendAmount.toFixed(2)} USD`} />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Link to={'/dashboard'}><Button variant="dark">Go Back</Button></Link>
      </Row>
    </Container>
  )
}
function mapStateToProps(state) {
  console.log("state", state)
  return { 
    sendAmount: state.sendMoney,
  };
}

export default connect(mapStateToProps)(SendMoney);