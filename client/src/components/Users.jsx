import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleInput: true,
      errors: [],
    };
  }

  usernameCheck(name) {
    let newErrors = []
    this.setState({errors: []})
    // follow this pattern to add more checks
    if (name.length < 3) {
      newErrors.push('Please use more than 3 characters')
    }
    if (name.match(/\W/)) {
      newErrors.push('Please only use numbers, letters and underscores')
    }
    if (!name[0].match(/[a-zA-Z]/)) {
      newErrors.push('First character must be a letter')
    }
    this.setState({errors: newErrors})
  }

  render() {
    return (
      <div>
        {!this.state.toggleInput ?
          <span
            style={{fontWeight:910, marginTop: '20px', marginBottom: '20px'}}
            onClick={() => {
              console.log(`ow! bye ${this.props.username}`);
              this.setState({toggleInput: true})
            }}>
          </span>
          :
          <input
            autoFocus
            type="text"
            placeholder={this.state.username || "Enter a Username"}
            value={this.state.input}
            onKeyUp={event => {
              if (event.keyCode === 13
                && !this.state.errors.length
                && event.target.value.length) {
                this.props.handleName(event.target.value)
                this.setState({
                  toggleInput: false
                })
                console.log(`here comes ${event.target.value}`)
              }
            }}
            onChange={event => {
              this.usernameCheck(event.target.value)
            }}
          />
        }
        {this.state.toggleInput ?
          <div>{this.state.errors.map((error, i) => <li key={i}>{error}</li>)}</div>
          : <div></div>
        }
      </div>
    )
  }
}

export default Users;
