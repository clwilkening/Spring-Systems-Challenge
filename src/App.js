import React, { Component } from 'react';
import './App.css';
import {Form, FormGroup, ControlLabel, FormControl, Col, Grid, Row, Button, FieldGroup} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.selectVendor = this.selectVendor.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.productDetails = this.productDetails.bind(this);
    this.productAvailability = this.productAvailability.bind(this);
    this.retailers = this.retailers.bind(this);

    this.state = {
      data: [],
      uom: "",
      prodPackCount: 1,
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
          <option key={vendor} value={vendor}>{vendor}</option>
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
          <option key={description} value={description}>{description}</option>
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
          <option key={uom} value={uom}>{uom}</option>
        )
    }
    return(uomOptions);
  }

  subProduct(){
    let subOptions = [];
    let products = this.state.data.SubProduct;
    for (let key in products){
      let product = products[key]
        subOptions.push(
          <option key={product} value={product}>{product}</option>
        )
    }
    return(subOptions);
  }



  productDetails(){
    return(
      <div>
      <Row>
        <Col xs={12} sm={12}>
          <h3>Product Details</h3>
        </Col>
      </Row>
      <Row>
        <FormGroup controlId="formControlsSelect">
          <Col sm={12} xs={12}>
            <ControlLabel>Select Vendor*</ControlLabel>
            <FormControl componentClass="select" placeholder="Vendors">
              {this.selectVendor()}
            </FormControl>
          </Col>
          <Col sm={7} xs={12}>
            <ControlLabel>Product Description*</ControlLabel>
            <FormControl componentClass="select" placeholder="Product Description">
              {this.productDescription()}
            </FormControl>
          </Col>
          <Col sm={6} xs={12}>
            <ControlLabel>Product UOM*</ControlLabel>
            <FormControl componentClass="select" placeholder="UOM">
                {this.productUOM()}
            </FormControl>
          </Col>
          <Col sm={6} xs={12}>
            <ControlLabel>Add to Catalog?*</ControlLabel>
            <FormControl componentClass="select" placeholder="Add to Catalog?">
              <option value="...">...</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </FormControl>
          </Col>
        </FormGroup>
      </Row>
      </div>
    )
  }

  productIdentifiers(){
    return(
      <div>
      <Col xs={12} sm={12}>
        <h3>Product Details</h3>
      </Col>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={12} md={3}>
            GTIN Code, UPC or EAN
          </Col>
          <Col sm={12} md={3}>
            <FormControl
              id="formControlsText"
              type="text"
              label="GTIN Code, UPC or EAN"
            >
            </FormControl>
          </Col>
          <Col componentClass={ControlLabel} sm={12} md={3}>
            Vendor Item Number
          </Col>
          <Col sm={12} md={3}>
          <FormControl
            id="formControlsText"
            type="text"
            label="Vendor Item Number"
          >
          </FormControl>
          </Col>
        </FormGroup>

      </div>
    )
  }

  removeProduct(){
    let count = this.state.prodPackCount;
    let newCount = count - 1;
    console.log(newCount)
    if (newCount >= 0) {
      this.setState({
        prodPackCount: newCount,
      })
    }
  }

  addPack(){
    let count = this.state.prodPackCount;
    let newCount = count + 1;
    this.setState({
      prodPackCount: newCount,
    })
  }

  productPack(){
    let packs = [];
    let count = this.state.prodPackCount;
    for (let i = 0; i < count; i++) {
      if(count === 0 ) return packs;
      packs.push(
        <div>
        <FormGroup>
          <Col sm={12} xs={12} md={3}>
            <ControlLabel>Sub-Product*</ControlLabel>
          </Col>
          <Col sm={12} xs={12} md={3}>
            <FormControl componentClass="select" placeholder="Vendors">
              <option>Select One</option>
              {this.subProduct()}
            </FormControl>
          </Col>
          <Col componentClass={ControlLabel} sm={12} md={3}>
            Sub-Product Qty*
          </Col>
          <Col sm={12} md={3}>
          <FormControl
            id="formControlsText"
            type="text"
            label="Vendor Item Number"
          >
          </FormControl>
          </Col>
          <Col xs={1}>
          <Button bsStyle="danger" onClick={() => this.removeProduct()}>Delete</Button>
          </Col>
        </FormGroup>
      </div>
      );
    }
    return packs;
  }

  retailers() {
    let retailOptions = [<option key="select-1" value="select" disabled>select (multiple)</option>];
      let retailers = this.state.data.Retailers;
      for (let key in retailers){
        let retail = retailers[key]
          retailOptions.push(
            <option key={retail} value={retail}>{retail}</option>
          )
      }
    return retailOptions;
  }

  productAvailability(){
    return(
      <div>
        <Col xs={12} sm={12}>
          <h3>Product Availability</h3>
        </Col>
        <FormGroup controlId="formControlsSelectMultiple">
          <Col xs={12} sm={4}>
            <ControlLabel>Product Availability</ControlLabel>
          </Col>
          <Col xs={12} sm={8}>
            <FormControl componentClass="select" multiple>
              {this.retailers()}
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Product Form</h2>
        </div>
      <Grid className="product-det">
      {this.state.data !== [] ?
        <Form horizontal>
          {this.productDetails()}
          {this.productIdentifiers()}
          <Col xs={12} sm={12}>
            <h3>Product Pack</h3>
          </Col>
          {this.productPack()}
          <Col xs={12} md={3} mdOffset={9}>
          <Button bsStyle="primary" onClick={()=> this.addPack()}>Add Product Pack(s)</Button>
          </Col>
          {this.productAvailability()}
        </Form>
      :
      <p>Loading</p>
      }
      </Grid>
      </div>
    );
  }
}

export default App;
