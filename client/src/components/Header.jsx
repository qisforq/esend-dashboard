import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo" > 
            &nbsp; &nbsp; 
            <img src={'images/esend-logo-white.png'} width="100"/>
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="#">
                Login With Google	
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;