import React from 'react';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {CheckboxGroup,Checkbox} from 'react-checkbox-group';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';


class UserQuery extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      data: {userName:''},
      query: 'query{user(userName:"',
      userList:[],
      user:[],
      respTable:''
    };
    this.setEmpState = this.setEmpState.bind(this);
    this.getuser = this.getuser.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }
  setEmpState(e){
    var field = e.target.name;
    var value = e.target.value;
    this.state.data[field] = value;
    this.setState({data: this.state.data});
  }

  getuser(userSelected){
    console.log("userSelected "+userSelected);
    this.setState({
        users: userSelected
    });
  }

  getUserDetails(e){
    console.log("users "+this.state.users);
    e.preventDefault();
    if(this.state.data.userName==''){
      alert('Please enter the userName for fetching details');
    }
    else if(this.state.users==''){
      alert('Please select atleast one checkbox');
    }
    else
    {
      var usersQuery = this.state.users.toString();
      usersQuery = usersQuery.replace(/,/g,' ');
      fetch('/api',{
          method: 'POST',
          body: this.state.query+this.state.data.userName+'"){' +usersQuery+'}}',
          headers: {
            "authentication": "basic"
          },
        })
      .then(res => res.json())
      .then(
        (result) => {  
          if(result.errors==''){         
            this.setState({ userList: this.state.user.concat(result.data.user)});
            this.setState({
            respTable : (
            <div><br/><br/>
              <BootstrapTable data={this.state.userList}  keyField='userName'>
                {this.state.users.map( column => 
                        <TableHeaderColumn dataField={column}>{column.toUpperCase()}</TableHeaderColumn>
                )}
              </BootstrapTable></div>)  
            }); 
          }
          else{
            result.errors.map(error=>
              this.setState({
                respTable : (<div id="errorStyle"><br/><br/>{error.message}</div>)
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
      <h1>UserDetails</h1>
      <input type="text" name="userName" placeholder="User Name" value = {this.state.data.userName} onChange = {this.setEmpState}/><br/>
      <CheckboxGroup
        name="users"
        value={this.state.users}
        onChange={this.getuser}>

        <br/><Checkbox value="userName"/> USERNAME
        <br/><Checkbox value="firstName"/> FIRSTNAME
        <br/><Checkbox value="lastName"/> LASTNAME
        <br/><Checkbox value="email"/> EMAIL
      </CheckboxGroup>
      <br/><br/>
      <div><button className="btn btn-default" onClick={this.getUserDetails}>Get User details</button> </div>
      {this.state.respTable}
      </div>
    );
  }
}

  export default UserQuery;