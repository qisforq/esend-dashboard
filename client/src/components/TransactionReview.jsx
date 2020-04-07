import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  acceptQuote } from '../actions';




const TransactionReview = (props) => {
  console.log("props:",props)
  let { sendAmount, receiveAmount, fxRate, senderFirstName, senderLastName, recipientFirstName, recipientLastName, clabe } = props;

  const handleSubmit = () => {
    // setShowError(true);
      // These lines were needed when acceptQuote was called here. 
      // TODO:Move these lines to whichever Component acceptQuote is called in.
  }

  return (
    <Container xs="auto">
      <Row><br/></Row>
      <Row>
        <h2>Transaction Review</h2>
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
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Sender Name:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={`    ${senderFirstName} ${senderLastName}`} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Recipient Name:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={`${recipientFirstName} ${recipientLastName}`} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              CLABE Number:
            </Form.Label>
            <Col xs="auto">
              <Form.Control plaintext readOnly defaultValue={`${clabe}`} />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Button 
          variant="dark"
          type="submit"
          onClick={handleSubmit}
        >Submit</Button>
      </Row>
    </Container>
  )
}
function mapStateToProps(state) {
  console.log("state", state)
  let { amounts, fxRate, rippleData, kyc } = state;
  if (!Object.entries(kyc).length) kyc ={senderInfo: {senderFirstName: 'N/A', senderLastName: ''}, recipientInfo: {recipientFirstName: 'N/A', recipientLastName: '', clabe: 'N/A'}};

  return { 
    sendAmount: amounts.sendAmount || 0,
    receiveAmount: amounts.receiveAmount || 0,
    fxRate,
    senderFirstName: kyc.senderInfo.senderFirstName,
    senderLastName: kyc.senderInfo.senderLastName,
    recipientFirstName: kyc.recipientInfo.recipientFirstName,
    recipientLastName: kyc.recipientInfo.recipientLastName,
    clabe: kyc.recipientInfo.clabe,
  };
}

export default connect(mapStateToProps)(TransactionReview);