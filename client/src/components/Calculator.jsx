import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
      // sendAmount: props.sendAmount,
      receiveAmount: 0,
      readyToTransfer: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateReceiveAmount = this.updateReceiveAmount.bind(this)
  }

  componentDidMount() {
    // this.props.updateSendAmount();
    // this.setState({sendAmount: this.props.sendAmount})
    this.updateReceiveAmount()
  }

  async handleChange(event){
    let num = parseFloat(event.target.value) || 0.00
    await this.props.updateSendAmount(num)
    // await this.setState({
    //   [event.target.id]: num
    // })
    await this.updateReceiveAmount();
    console.log("this.props.sendAmount:", this.props.sendAmount)
  }

  async handleSubmit(e){
    e.preventDefault();
    // await this.props.updateSendAmount(this.state.sendAmount)
    await this.props.lockQuote(this.state.receiveAmount.toFixed(2))
    await this.setState({readyToTransfer: true})
  }

  updateReceiveAmount() {
    let rate = this.props.usdMxnRate;
    // let { sendAmount } = this.state;
    let { sendAmount } = this.props;
    let receiveAmount = sendAmount * rate;
    this.setState({
      receiveAmount,
    })
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
                            value={this.props.sendAmount || ""}
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
                            // disabled
                            readOnly
                            placeholder="Receive Amount"
                            value={this.state.receiveAmount > 0 ? this.state.receiveAmount.toFixed(2) : ""}
                            // onChange={this.handleChange}
                            // type="number"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="mxn">MXN</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Form.Text className="text-muted">
                      {`1 USD = ${this.props.usdMxnRate > 0 ? this.props.usdMxnRate.toFixed(4) : '( ͡° ͜ʖ ͡°) We\'re still doing the math, but it\'ll be a whole bunch of'} MXN`}
                    </Form.Text>
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

function mapStateToProps(state) {
  console.log(state);
  
  let usdMxnRate = 0;
  if (state.ripple) {
    usdMxnRate = state.ripple.usdMxnRate
  }
  let sendAmount = state.sendMoney || 0;
  return { 
    usdMxnRate, 
    sendAmount,
  };
}

export default connect(mapStateToProps, actions)(Calculator);