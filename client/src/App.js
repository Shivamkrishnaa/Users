import React , { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props){
    super(props);
    this.state = { apiResponse : " "}
  }

  callApi() {
    fetch('http://localhost:8000/api/auth/')
    .then(res=> res.text() )
    .then(res => this.setState({ apiResponse :res }))
  }
  componentDidMount() {
    this.callApi();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p className="App-intro">{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
