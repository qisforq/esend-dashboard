import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sendAmount: 0,
      receiveAmount: 0,
      readyToTransfer: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    let num = parseFloat(event.target.value) || 0.00
    console.log(num);
    console.log(num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));

    this.setState({
      [event.target.id]: num
    });
  }

  async handleSubmit(e){
    e.preventDefault();
    console.log(e)
    await this.setState({readyToTransfer: true})
  }

  render() {
    if (this.state.readyToTransfer) {
      return <Redirect to='/mexico/send-money'/>
    }
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
                    <Col>
                      <Form.Group controlId="sendAmount">
                        <Form.Label>You Send</Form.Label>
                        <InputGroup>
                          <Form.Control 
                            placeholder="Send Amount"
                            value={this.state.sendAmount || ""}
                            onChange={this.handleChange}
                            type="number"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="usd">USD</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="receiveAmount">
                        <Form.Label>They Receive</Form.Label>
                        <InputGroup>
                          <Form.Control
                            disabled
                            placeholder="Receive Amount"
                            value={this.state.receiveAmount || ""}
                            onChange={this.handleChange}
                            type="number"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="mxn">MXN</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row><br/></Row>
                  <Row className="justify-content-center">
                      <Button 
                        variant="dark"
                        type="submit"
                        onClick={this.handleSubmit}
                      >Send Money</Button>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Row>
        </Container>
    )
  }
}
export default Calculator;