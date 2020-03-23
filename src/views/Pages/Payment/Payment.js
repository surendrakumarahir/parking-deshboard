import React, { Component } from 'react';
import { Button, Col, Container, Input, Card, CardHeader, CardBody, FormGroup, Label, Row, ButtonToggle } from 'reactstrap';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZmMWMzMDg2ZWFlYjJjYWExMDY3NmYiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0aW5nIiwiZW1haWwiOiJzdXJlbmRyYUBkZWxpbXAuY29tIiwiaWF0IjoxNTg0NjExOTM5LCJleHAiOjE1ODQ2MTkxMzl9.Cw8zXWCDkc8JkdMKJcgZWAjgJ9nNVbMCCyyHyPvmDS0';
class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      price: 12, 
      paymentStatus: false,
      data: '',
    }
  }
  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    var raw = {};
  
    var requestOptions = {
      method: 'GET',
      headers: headers,
   //   body: JSON.stringify(raw),
   //   redirect: 'follow'
    };
  
      fetch(`https://www.kartblock.com:5000/api/vehicleparking/${this.props.match.params.id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({data: result.data, paymentStatus: result.data.paymentStatus})
            console.log('result', result);
        })
        .catch(error => console.log('error', error));
  }

  submitHandle = () => {
     const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
  };
  var raw = {paymentStatus: 1};

  var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

    fetch(`https://www.kartblock.com:5000/api/vehicleparking/${this.props.match.params.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
          this.setState({paymentStatus: true})
          console.log('result', result);
      })
      .catch(error => console.log('error', error));
     
  }
  render() {
    const {paymentStatus} = this.state;
    console.log('state', this.state);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            {/* <Col md="6">
           
            </Col> */}
            <Col md="6">
              {paymentStatus ? (
                <Row className="justify-content-center">
                  <img alt="done" src="https://www.kindpng.com/picc/m/106-1064902_transparent-check-mark-gif-png-download-done-icon.png" style={{width: "100px"}}/>
                </Row>
               
              ) : (
                <Card>
                <CardHeader>
                  <strong>Credit Card</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                 <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name" style={{display: 'block'}}>CarNumber: {this.state.data.vehicleNumber}</Label>
                        <Label htmlFor="name"  style={{display: 'block'}}>Entry Time: {this.state.data.inTime}</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter your name" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="ccnumber">Credit Card Number</Label>
                        <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="ccmonth">Month</Label>
                        <Input type="select" name="ccmonth" id="ccmonth">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="ccyear">Year</Label>
                        <Input type="select" name="ccyear" id="ccyear">
                          <option>2017</option>
                          <option>2018</option>
                          <option>2019</option>
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="cvv">CVV/CVC</Label>
                        <Input type="text" id="cvv" placeholder="123" required />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
             )}
             </Col>
          </Row>
          {paymentStatus ? 
          null : (
             <Row className="justify-content-center">
              <Button size="lg" color="primary" onClick={() => this.submitHandle()}>PayNow</Button>{' '}
             </Row>
          )} 
        </Container>
      </div>
    );
  }
}

export default Payment;
