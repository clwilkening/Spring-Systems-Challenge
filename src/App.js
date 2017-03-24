import React, { Component } from 'react';
import './App.css';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    this.selectVendor = this.selectVendor.bind(this);
    this.productDetails = this.productDetails.bind(this);

    this.state = {
      data: [],
    };
  };

  componentDidMount(){
    let data = require('./form.json');  //import the json file
    this.setState({ data }); //set data to state so that it can be used throughout app
  }

  selectVendor(){
    let vendorOptions = [];
    let vendors = this.state.data.vendors;
    //console.log(vendors)
    for (let key in vendors){
      let vendor = vendors[key]
        vendorOptions.push(
          <option value={vendor}>{vendor}</option>
        )
    }
    return(vendorOptions);
  }

  productDescription(){
    let descriptionOptions = [];
    let descriptions = this.state.data.descriptions;
    for (let key in descriptions){
      let description = descriptions[key]
        descriptionOptions.push(
          <option value={description}>{description}</option>
        )
    }
    return(descriptionOptions);
  }

  productUOM(){
    let uomOptions = [];
    let uoms = this.state.data.UOM;
    for (let key in uoms){
      let uom = uoms[key]
        uomOptions.push(
          <option value={uom}>{uom}</option>
        )
    }
    return(uomOptions);
  }



  productDetails(){
    return(
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select Vendor*</ControlLabel>
      <FormControl componentClass="select" placeholder="Vendors">
        {this.selectVendor()}
      </FormControl>
      <ControlLabel>Product Description*</ControlLabel>
      <FormControl componentClass="select" placeholder="Product Description">
        {this.productDescription()}
      </FormControl>
      <ControlLabel>Product UOM*</ControlLabel>
      <FormControl componentClass="select" placeholder="UOM">
        {this.productUOM()}
      </FormControl>
      <ControlLabel>Add to Catalog?*</ControlLabel>
      <FormControl componentClass="select" placeholder="Add to Catalog?">
        <option value="...">...</option>
        <option value="yes">yes</option>
        <option value="no">no</option>
      </FormControl>
    </FormGroup>
  )
}



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Product Form</h2>
        </div>
      {this.productDetails()}
      </div>
    );
  }
}

export default App;
