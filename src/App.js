import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI' 
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({'books':books})
    })
    
  }

  // Function to move book from one shelf to another 
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books
      book.shelf = shelf
      books[books.findIndex(b => b.id === book.id)] = book
      this.setState({'books': books})
    })
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            updateBookShelf={this.updateShelf} 
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks/>                            
        )}/>    
      </div>
    )
  }
}

export default BooksApp
