import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';

const EsendInternalData = (props) => {
  console.log(props);
  
  const { sendAmount, rippleData } = props;
  if (rippleData && rippleData.payment_state) return <div />;
  
  return (
      <Row>
        <Form>
          <br /><h5>ESEND internal data:</h5>
          <Form.Group as={Row}>
            <Form.Label column xs="6">
              Amount sent to Ripple:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={rippleData ? `${rippleData.rippleSendingAmountUSD} USD` : "N/A"} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="6">
              Amount received in Mexico:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={rippleData ? `${rippleData.rippleReceivingAmountMXN.toFixed(2)} MXN` : "N/A"} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">
              Ripple Exchange Rate:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={rippleData ? `1 USD = ${rippleData.rippleFxRate.toFixed(4)} MXN` : "N/A"} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="6">
              ESEND makes:
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={
                rippleData ? (
                  (sendAmount - parseFloat(rippleData.rippleSendingAmountUSD)).toFixed(2)
                ) : "N/A"
              } />
            </Col>
          </Form.Group>
        </Form>
      </Row>
  )
}

function mapStateToProps(state) {
  let { amounts, rippleData } = state;
  return { 
    sendAmount: amounts.sendAmount || 0,
    rippleData,
  };
}

export default connect(mapStateToProps)(EsendInternalData);