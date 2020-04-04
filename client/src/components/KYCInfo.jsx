import React, { useState } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';



const KYCInfo = (props) => {
  // console.log("props:",props)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clabe, setClabe] = useState('');
  
  return (
    
      <Row>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs="3">
              Recipient Name:
            </Form.Label>
            <Col>
              <Form.Control 
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
              />
            </Col>
            <Col>
              <Form.Control 
                placeholder="Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs="3">Bank:</Form.Label>
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
      </Row>
  )
}
function mapStateToProps(state) {
  console.log("state", state)
  return { };
}

export default connect(mapStateToProps)(KYCInfo);