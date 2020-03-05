import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/Users.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }



  render() {
      return (
        <div >
          <div className="jumbotron text-center" style={{backgroundImage : `linear-gradient(rgb(70,90,201), rgb(199,205,238))`, fontFamily: 'sans-serif'}}>
          <h1 style={{color : "white"}}>eSend Ripple API Dashboard</h1>
          </div>
          <p>
            <a href="/auth/google">Sign In With Google</a>
          </p>
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
