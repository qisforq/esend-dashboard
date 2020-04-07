import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { updateSenderKYC, updateRecipientKYC, acceptQuote }from '../actions';


const KYCInfo = (props) => {
  // console.log("props:",props)
  const [recipientFirstName, setRecipientFirstName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');
  const [senderFirstName, setSenderFirstName] = useState('');
  const [senderLastName, setSenderLastName] = useState('');
  const [clabe, setClabe] = useState('');
  // const [showError, setShowError] = useState(false)
    // This line was needed when acceptQuote was called here. 
    // TODO:Move these lines to whichever Component acceptQuote is called in.

  const updateKYCInfo = () => {
    props.updateSenderKYC({senderFirstName, senderLastName});
    props.updateRecipientKYC({recipientFirstName, recipientLastName, clabe});
  }

  const handleSubmit = () => {
    // if (props.rippleData) 
    updateKYCInfo(senderFirstName, senderLastName, recipientFirstName, recipientLastName, clabe);
    // else setShowError(true);
      // These lines were needed when acceptQuote was called here. 
      // TODO:Move these lines to whichever Component acceptQuote is called in.
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
              />
            </Col>
            <Col>
              <Form.Control 
                placeholder="Last name"
                value={senderLastName}
                onChange={e => setSenderLastName(e.target.value)}
                type="text"
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
        {/* {showError && (<Alert variant="danger">Error! Transaction can't be completed at this time.</Alert>)} 
        This line was needed when acceptQuote was called here.
        TODO: Move this line to whichever Component acceptQuote is called in.*/}
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
    // acceptQuote: (quoteId, recipientFirstName, recipientLastName, clabe) => dispatch(acceptQuote(quoteId, recipientFirstName, recipientLastName, clabe))
      // This line was needed when acceptQuote was called here. 
      // TODO:Move these lines to whichever Component acceptQuote is called in.
  };
}

export default connect(null, mapDispatchToProps)(KYCInfo);