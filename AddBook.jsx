import React from 'react';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {CheckboxGroup,Checkbox} from 'react-checkbox-group';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';


class AddBook extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {
        isn:'',
        title:'',
        publisher:'',
        authors:'',
        publishedDate:'',
        userName:''
      },
      queryStrings:{
        title:'", title:"',
        publisher:'", publisher:"',
        authors:'", authors:"',
        publishedDate:'", publishedDate:"',
        userName:'", userName:"',
        return:'"){isn title}}'
      },
      addBookQuery: 'mutation{addBooks(isn: "',
      respTable:''
    };
    this.addBook = this.addBook.bind(this);
    this.setEmpState=this.setEmpState.bind(this);
  }

  setEmpState(e){
    var field = e.target.name;
    var value = e.target.value;
    this.state.data[field] = value;
    this.setState({data: this.state.data});
  }

  addBook(e){
    var bookQuery='';
    e.preventDefault();
    if(this.state.data.isn==''|| this.state.data.title==''||this.state.data.publisher==''||this.state.data.authors==''
          ||this.state.data.publishedDate==''||this.state.data.userName==''){
      alert('All the details are mandatory. Please enter data in all fields');
    }
    else
    {
      bookQuery = this.state.addBookQuery+this.state.data.isn
                    +this.state.queryStrings.title+this.state.data.title
                    +this.state.queryStrings.publisher+this.state.data.publisher
                    +this.state.queryStrings.authors+this.state.data.authors
                    +this.state.queryStrings.publishedDate+this.state.data.publishedDate
                    +this.state.queryStrings.userName+this.state.data.userName
                    +this.state.queryStrings.return;

      fetch('/api',{
          method: 'POST',
          body: bookQuery,
          headers: {
            "authentication": "basic"
          },
        })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.errors=='' && result.data.addBooks!=''){
              this.setState({
                respTable : (
                  <div id="successStyle"><br/><br/>Book added successfully!!!! </div>
                )
              })
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
      <h1>Add Book</h1>
      <input type="text" name="isn" placeholder="ISN" value = {this.state.data.isn} onChange = {this.setEmpState}/>
      <input type="text" name="title" placeholder="TITLE" value = {this.state.data.title} onChange = {this.setEmpState}/>
      <input type="text" name="publisher" placeholder="PUBLISHER" value = {this.state.data.publisher} onChange = {this.setEmpState}/>
      <input type="text" name="authors" placeholder="AUTHORS" value = {this.state.data.authors} onChange = {this.setEmpState}/>
      <input type="text" name="publishedDate" placeholder="PUBLISHEDDATE" value = {this.state.data.publishedDate} onChange = {this.setEmpState}/>
      <input type="text" name="userName" placeholder="USERNAME" value = {this.state.data.userName} onChange = {this.setEmpState}/>
      <br/><br/>
      <div><button className="btn btn-default" onClick={this.addBook}>Add book to rack</button> </div>
      {this.state.respTable}
      </div>
    );
  }
}

  export default AddBook;