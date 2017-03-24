import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  };

  componentDidMount(){
    let data = require('./form.json');  //import the json file
    this.setState({ data }); //set data to state so that it can be used throughout app
  }

productDetails(){

}



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Product Form</h2>
        </div>

      </div>
    );
  }
}

export default App;
