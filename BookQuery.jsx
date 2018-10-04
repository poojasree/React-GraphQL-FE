import React from 'react';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {CheckboxGroup,Checkbox} from 'react-checkbox-group';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';


class BookQuery extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      data: {isn:''},
      bookIdQuery: 'query{book(id:"',
      allBooksquery: 'query{allBooks{',
      allBooks:[],
      book:[],
      respTable:''
    };
    this.booksFetch = this.booksFetch.bind(this);
    this.fetchBookDetails = this.fetchBookDetails.bind(this);
    this.setEmpState=this.setEmpState.bind(this);
  }

  setEmpState(e){
    var field = e.target.name;
    var value = e.target.value;
    this.state.data[field] = value;
    this.setState({data: this.state.data});
  }
  
  booksFetch(booksSelected){
    console.log("booksSelected "+booksSelected);
    this.setState({
    books: booksSelected
    });
  }

  fetchBookDetails(e){
    console.log("books "+this.state.books);
    e.preventDefault();
    if(this.state.books==''){
      alert('Select atleast one checkbox');
    }
    else
    {
      var booksQuery = this.state.books.toString();
      booksQuery = booksQuery.replace(/,/g,' ');
      var bookQuery='';
      if(this.state.data.isn==''){
        bookQuery = this.state.allBooksquery+booksQuery+'}}'
      }
      else{
        bookQuery = this.state.bookIdQuery+this.state.data.isn+'"){' +booksQuery+'}}'
      }
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
          if(result.errors==''){ 
            if(this.state.data.isn==''){
              this.setState({
                allBooks: result.data.allBooks
              });
            } else{
              // this.setState({
              //   allBooks: result.data.allBooks
              // });
              this.setState({ allBooks: this.state.book.concat(result.data.book)});
            }  
             
            console.log(this.state.allBooks);
            console.log(this.state.books);
            this.setState({
              respTable : (
              <div><br/><br/>
                <BootstrapTable data={this.state.allBooks}  keyField='isn'>
                {this.state.books.map( column => 
                        <TableHeaderColumn dataField={column}>{column.toUpperCase()}</TableHeaderColumn>
                )}
              </BootstrapTable></div>
              )  
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
      <h1>BookDetails</h1>
      <input type="text" name="isn" placeholder="Book ID" value = {this.state.data.isn} onChange = {this.setEmpState}/>
      <CheckboxGroup
        name="books"
        value={this.state.books}
        onChange={this.booksFetch}>

        <br/><Checkbox value="isn"/> ISN
        <br/><Checkbox value="title"/> TITLE
        <br/><Checkbox value="publisher"/> PUBLISHER
        <br/><Checkbox value="authors"/> AUTHORS
        <br/><Checkbox value="publishedDate"/> PUBLISHEDDATE
        <br/><Checkbox value="userName"/> USERNAME
      </CheckboxGroup>
      <br/><br/>
      <div><button className="btn btn-default" onClick={this.fetchBookDetails}>Get Book details</button> </div>
      {this.state.respTable}
      </div>
    );
  }
}

  export default BookQuery;