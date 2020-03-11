import React, { useState } from "react";
// import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Calculator = () => {
  const [key, setKey] = useState('home');

  return (
      <Container>
        <Row><h4>Send Money to Mexico!</h4></Row>
        <Row>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#send-money">
                <Nav.Item><Nav.Link href="#send-money">Send Money</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#pay-bill" disabled>Pay Bill</Nav.Link></Nav.Item>            
                <Nav.Item><Nav.Link href="#top-up" disabled>Top Up</Nav.Link></Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Form.Label>You Send</Form.Label>
                  <InputGroup>
                    <Form.Control placeholder="Send Amount"/>
                    <InputGroup.Append>
                      <InputGroup.Text id="usd">USD</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Row>
                <br/>
                <Row>
                  <Form.Label>They Receive</Form.Label>
                  <InputGroup>
                    <Form.Control placeholder="Receive Amount"/>
                    <InputGroup.Append>
                      <InputGroup.Text id="mxn">MXN</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Row>
      </Container>
  )
}
export default Calculator;