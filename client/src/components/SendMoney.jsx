import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import ESENDInternalData from './ESENDInternalData.jsx';
import KYCInfo from './KYCInfo.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
// import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';



const SendMoney = (props) => {
  console.log("props:",props)
  const { sendAmount, receiveAmount, fxRate, rippleData } = props;
 
  return (
    <Container xs="auto">
      <Row><br/></Row>
      <Row>
        <h2>New Transaction</h2>
      </Row>
      <Row>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Send Amount:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={`    ${sendAmount.toFixed(2)} USD`} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Receive Amount:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={`${receiveAmount.toFixed(2)} MXN`} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Exchange Rate:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={fxRate ? `  1 USD = ${fxRate.toFixed(4)} MXN` : "  N/A"} />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <KYCInfo />
      <br />
      <Row>
        <Col xs="auto">
          <Link to={'/dashboard'}><Button variant="dark">Go Back</Button></Link>
        </Col>
        <Col xs="auto">
          <Button variant="dark">Submit</Button>
        </Col>
      </Row>
      <br />
      <ESENDInternalData />
    </Container>
  )
}
function mapStateToProps(state) {
  console.log("state", state)
  let { amounts, fxRate, rippleData } = state;
  return { 
    sendAmount: amounts.sendAmount || 0,
    receiveAmount: amounts.receiveAmount || 0,
    fxRate,
    rippleData,
  };
}

export default connect(mapStateToProps)(SendMoney);