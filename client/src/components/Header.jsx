import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Header extends Component {
  renderLogin() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return <Nav.Link href="/auth/google" active><Button variant="outline-light" size="md">Login With Google</Button></Nav.Link>
      default:
        return <Nav.Link href="/api/logout" active><Button variant="outline-light" size="md">Logout</Button></Nav.Link>
    }
  }

  render() {
    // const old = (
    //   <nav>
    //     <div className="nav-wrapper" style={{backgroundColor: "rgb(70,90,201)"}}>
    //       <Link to={this.props.auth ? '/dashboard' : '/'} className="left brand-logo" > 
    //         &nbsp; &nbsp; 
    //         <img src={'images/esend-logo-white.png'} width="100"/>
    //       </Link>
    //       <ul id="nav-mobile" className="right">
    //         <li>
    //         {this.renderLogin()}
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // )
    return (
        <Navbar bg='dark' variant="dark" >
          <Navbar.Brand>
            <Link to={this.props.auth ? '/dashboard' : '/'} > 
              <img src={'images/esend-logo-white.png'} width="100"/>
            </Link>
          </Navbar.Brand>
          <Container className="justify-content-end">
            <Nav>
              <Nav.Item>{this.renderLogin()}</Nav.Item>
            </Nav>
          </Container>
        </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);