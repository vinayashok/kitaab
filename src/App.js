import React from "react"
import { Route } from "react-router-dom"
import ListBooks from "./ListBooks"
import SearchBooks from "./SearchBooks"
import * as BooksAPI from "./BooksAPI"
import "./App.css"


/**
* @description Represents a books app react component 
*/
class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({'books':books})
    })
  }
  
  /**
  * @description Represents a function to update search 
  * results when returning from Search page
  * @param {string} title - The title of the book
  * @param {string} author - The author of the book
  */
  updateSearchResults = () => {
    this.setState({'searchResults': []})
    this.componentDidMount()
  }

   /**
   * @description Function to move book from one shelf to another
   * @param {string} book - The book that needs to be updated
   * @param {string} shelf - The Shelf in which the book needs to be moved
  */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books
      book.shelf = shelf
      books[books.findIndex(b => b.id === book.id)] = book
      this.setState({'books': books})
    })
    
  }

  /**
  * @description Function to search books.
  * @param {string} query - Search query.
  * @param {string} maxResults - Maximum resukts that API can return.
  */
  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then(books => {
      if (books instanceof Array) {
        this.setState({'searchResults': books})
      } else {
        this.setState({'searchResults': []})
      }
      
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
          <SearchBooks
            books={this.state.searchResults}
            srbooks={this.state.books}
            updateBookShelf={this.updateShelf}
            searchBooks={this.searchBooks}
            updateSearch={this.updateSearchResults}
          />
        )}/>    
      </div>
    )
  }
}

export default BooksApp