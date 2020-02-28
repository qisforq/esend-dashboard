import React from 'react';
import ReactDOM from 'react-dom';
import ComponentTest from "./components/ComponentTest.jsx";
import Users from './components/Users.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
    this.getUsername = this.getUsername.bind(this); 

  }

  getUsername(name) {
    this.setState({ username: name }, () => {
      console.log(`ping? you got a ${this.state.username} in there?`);
      axios.post('/users', {
        username: this.state.username,
      })
        .then((res) => {
          console.log('ping!? here\'s the .then... (success?)');
          // do something
        })
        .catch((err) => {
          console.log(`error on post to /users: ${err}`);
        });
    });
  }


  render() {
      return (
        <div >
          <div className="jumbotron text-center" style={{backgroundImage : `linear-gradient(rgb(70,90,201), rgb(199,205,238))`, fontFamily: 'sans-serif'}}>
          <h1 style={{color : "white"}}>eSend Ripple API Dashboard</h1>
          </div>
          <Users
            handleName={this.handleName}
            username={this.state.username}
          />
          {
            this.state.username && // render after username is selected
            <ComponentTest />
          }
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
