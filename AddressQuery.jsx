import React from 'react';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {CheckboxGroup,Checkbox} from 'react-checkbox-group';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';


class AddressQuery extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      data: {id:''},
      query: 'query{address(id:"',
      add:[],
      respTable:'',
      addList:[]
    };
    this.setEmpState = this.setEmpState.bind(this);
    this.getaddress = this.getaddress.bind(this);
    this.getAddressDetails = this.getAddressDetails.bind(this);
  }

  setEmpState(e){
    var field = e.target.name;
    var value = e.target.value;
    this.state.data[field] = value;
    this.setState({data: this.state.data});
  }

  getaddress(addSelected){
    console.log("addSelected "+addSelected);
    this.setState({
      address: addSelected
    });
  }

  
  getAddressDetails(e){
    console.log("address "+this.state.address);
    e.preventDefault();
    if(this.state.data.id==''){
      alert('please enter an address id for getting details');
    }
    else if(this.state.address==''){
      alert('Please select atleast one checkbox');
    }
    else
    {
      var addQuery = this.state.address.toString();
      addQuery = addQuery.replace(/,/g,' ');
      fetch('/api',{
          method: 'POST',
          body: this.state.query+this.state.data.id+'"){' +addQuery+'}}',
          headers: {
            "authentication": "basic"
          },
        })
      .then(res => res.json())
      .then(
        (result) => { 
          if(result.errors==''){
            this.setState({ addList: this.state.add.concat(result.data.address)});
            this.setState({
            respTable : (
            <div><br/>
              <BootstrapTable data={this.state.addList}  keyField='id'>
                {this.state.address.map( column => 
                        <TableHeaderColumn dataField={column}>{column.toUpperCase()}</TableHeaderColumn>
                )}
              </BootstrapTable></div>)  
            });    
          }
          else{
            result.errors.map(error=>
              this.setState({
                respTable : (<div id="errorStyle"><br/>{error.message}</div>)
              }) 
            )
          }
        }                
      )
    }
  }
  

  render() {
    return (
      <div>
      <h1>AddressDetails</h1>
      <input type="text" name="id" placeholder="Address ID" value = {this.state.data.id} onChange = {this.setEmpState}/><br/>
      <CheckboxGroup
        name="address"
        value={this.state.address}
        onChange={this.getaddress}>

        <br/><Checkbox value="id"/> ID
        <br/><Checkbox value="userName"/> USERNAME
        <br/><Checkbox value="house"/> HOUSE
        <br/><Checkbox value="street"/> STREET
        <br/><Checkbox value="city"/> CITY
      </CheckboxGroup>
      <br/>
      <div><button className="btn btn-default" onClick={this.getAddressDetails}>Get Address details</button> </div>
      {this.state.respTable}
      </div>
    );
  }
}

  export default AddressQuery;