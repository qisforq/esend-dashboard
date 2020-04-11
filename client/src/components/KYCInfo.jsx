import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { updateSenderKYC, updateRecipientKYC }from '../actions';


const KYCInfo = (props) => {
  // console.log("props:",props)
  const [recipientFirstName, setRecipientFirstName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');
  const [senderFirstName, setSenderFirstName] = useState('');
  const [senderLastName, setSenderLastName] = useState('');
  const [clabe, setClabe] = useState('');


  const updateKYCInfo = () => {
    props.updateSenderKYC({senderFirstName, senderLastName});
    props.updateRecipientKYC({recipientFirstName, recipientLastName, clabe});
  }

  const handleSubmit = () => {
    // if (props.rippleData) 
    updateKYCInfo(senderFirstName, senderLastName, recipientFirstName, recipientLastName, clabe);
  }

  return (
    <div>
      <Row>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs="3">
              Sender Name:
            </Form.Label>
            <Col>
              <Form.Control 
                placeholder="First name"
                value={senderFirstName}
                onChange={e => setSenderFirstName(e.target.value)}
                type="text"
                // readOnly defaultValue={props.userInfo.first_name}
              />
            </Col>
            <Col>
              <Form.Control 
                placeholder="Last name"
                value={senderLastName}
                onChange={e => setSenderLastName(e.target.value)}
                type="text"
                // readOnly defaultValue={props.userInfo.last_name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="3">
              Recipient Name:
            </Form.Label>
            <Col>
              <Form.Control 
                placeholder="First name"
                value={recipientFirstName}
                onChange={e => setRecipientFirstName(e.target.value)}
                type="text"
              />
            </Col>
            <Col>
              <Form.Control 
                placeholder="Last name"
                value={recipientLastName}
                onChange={e => setRecipientLastName(e.target.value)}
                type="text"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="3">Recipient Bank:</Form.Label>
            <Col>
              <Form.Control 
                placeholder="CLABE number"
                value={clabe}
                onChange={e => setClabe(e.target.value)}
                type="number"
              />
            </Col>
          </Form.Group>
        </Form>
        <Alert variant="warning">(for testing, please enter 012180001124566227 as the CLABE)</Alert>
      </Row>
        <br />
        <Row>
          <Col xs="auto">
            <Link to={'/dashboard'}><Button variant="dark">Go Back</Button></Link>
          </Col>
          <Col xs="auto">
            <Link to={useLocation().pathname + '/review'}>
              <Button 
                variant="dark"
                type="submit"
                onClick={handleSubmit}
              >Submit</Button>
            </Link>
          </Col>
        </Row>
        <br />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return { 
    updateSenderKYC: (info) => dispatch(updateSenderKYC(info)),
    updateRecipientKYC: (info) => dispatch(updateRecipientKYC(info)),
  };
}

// function mapStateToProps({ auth }) {
//   let userInfo = auth
//   if (!userInfo) userInfo = {first_name: 'N/A', last_name: 'N/A'}
//   return { userInfo };
// }

export default connect(null, mapDispatchToProps)(KYCInfo);