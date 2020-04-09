import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSendAmount, updateReceiveAmount, lockQuote } from '../actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveAmount: 0,
      showError: false,
      //readyToTransfer: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calculateReceiveAmount = this.calculateReceiveAmount.bind(this)
  }

  componentDidMount() {
    this.calculateReceiveAmount()
    // You have to call calculateReceiveAmount here so that way if the user is navigating back from the SendMoney page, the recipient amount will render
  }

  async handleChange(event){
    let sendAmount = event.target.value;
    if (sendAmount === "") sendAmount = 0;
    else sendAmount = parseFloat(event.target.value);
    
    if (!Number.isNaN(sendAmount)) {
      await this.props.updateSendAmount(sendAmount)
      // await this.setState({
      //   [event.target.id]: num
      // })
      await this.calculateReceiveAmount();
    }
    
  }

  async handleSubmit(e) {
    try {
      await this.props.lockQuote(this.state.receiveAmount.toFixed(2))
      await this.props.updateSendAmount(parseFloat(this.props.amounts.sendAmount.toFixed(2)))
      await this.props.updateReceiveAmount(parseFloat(this.state.receiveAmount.toFixed(2)))
      // await this.setState({readyToTransfer: true})
      this.props.history.push("/send-money")
    } catch(e) {
      console.error(e)
      this.setState({showError: true})
    }
  }

  calculateReceiveAmount() {
    let rate = this.props.usdMxnRate;
    let { sendAmount } = this.props.amounts;
    let receiveAmount = sendAmount * rate;
    this.setState({
      receiveAmount,
    })
  }

  render() {
    // if (this.state.readyToTransfer) return <Redirect to='/send-money'/>
    // else 
    return (
        <Container>
          <Row>
            {this.state.showError ? (<Alert variant="danger" dismissible onClose={() => this.setState({showError: false})}>The minimum amount you can send is $26.</Alert>) : (<h4>Send Money to Mexico!</h4>)} 
          </Row>
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
                            value={this.props.amounts.sendAmount || ""}
                            onChange={this.handleChange}
                            // type="number"
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
  let usdMxnRate = 0;
  if (state.fxRate) {
    usdMxnRate = state.fxRate
  }
  // let sendAmount = state.amounts.sendAmount || 0;
  return { 
    usdMxnRate, 
    // sendAmount,
    amounts: state.amounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSendAmount: (sendAmount) => dispatch(updateSendAmount(sendAmount)),
    updateReceiveAmount: (receiveAmount) => dispatch(updateReceiveAmount(receiveAmount)),
    lockQuote: (receiveAmount) => dispatch(lockQuote(receiveAmount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calculator));