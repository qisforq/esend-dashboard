import React, { useState } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {  acceptQuote } from '../actions';




const TransactionReview = (props) => {
  console.log("props:",props)
  const { sendAmount, receiveAmount, fxRate, senderFirstName, senderLastName, recipientFirstName, recipientLastName, clabe, quoteId, acceptQuote, rippleData } = props;
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    try {
      console.log("quoteId", quoteId);
      await acceptQuote(quoteId, recipientFirstName, recipientLastName, clabe)
      console.log("transaction", quoteId,"accepted by Ripple!!");
      setShowSuccess(true)
    } catch(e) {
      console.error(e)
      setShowError(true);
    }
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
        {showError && (<Alert variant="danger">Error! Transaction can't be completed at this time.</Alert>)} 
        {showSuccess && (
          <Alert variant="success">
            <Alert.Heading>Congratulations!</Alert.Heading>
            <p>${sendAmount} has been sent to {recipientFirstName} in México.</p>
            <hr />
            <p>Payment ID: {rippleData.payment_id}</p>
            <p>
              This transaction has been submitted to Ripple and Payment State is now {rippleData.payment_state}. However, this transaction isn't technically executed until eSend SETTLES the payment, which it will do using a CRON script that runs the "Settle Payments" function at a set time interval. 
            </p>
            <p>
              But first Quentin has to implement all the database functions that will persist this transaction data to the database.
            </p>
          </Alert>
        )} 
      </Row>
      <Row>
        {!showSuccess && (<Button 
          variant="dark"
          type="submit"
          onClick={handleSubmit}
        >Submit</Button>)}
      </Row>
    </Container>
  )
}

function mapStateToProps(state) {
  console.log("state", state)
  console.log(`ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ
rippleData inside TransactionReview mapStateToProps:`,state.rippleData);
  let { amounts, fxRate, rippleData, kyc } = state;
  if (!Object.entries(kyc).length) kyc = {senderInfo: {senderFirstName: 'N/A', senderLastName: ''}, recipientInfo: {recipientFirstName: 'N/A', recipientLastName: '', clabe: 'N/A'}};
  if (!rippleData) rippleData = {quoteId: 'N/A'}

  return { 
    sendAmount: amounts.sendAmount || 0,
    receiveAmount: amounts.receiveAmount || 0,
    fxRate: fxRate || 0,
    senderFirstName: kyc.senderInfo.senderFirstName,
    senderLastName: kyc.senderInfo.senderLastName,
    recipientFirstName: kyc.recipientInfo.recipientFirstName,
    recipientLastName: kyc.recipientInfo.recipientLastName,
    clabe: kyc.recipientInfo.clabe,
    quoteId: rippleData.quoteId,
    rippleData,
  };
}

function mapDispatchToProps(dispatch) {
  
  return { 
    acceptQuote: (quoteId, recipientFirstName, recipientLastName, clabe) => dispatch(acceptQuote(quoteId, recipientFirstName, recipientLastName, clabe))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionReview);