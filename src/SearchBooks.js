import React from "react"
import { Link } from "react-router-dom"
import propTypes from "prop-types"

/**
* @description Represents a books search react component 
*/
class SearchBooks extends React.Component {
  
  static propTypes = {
    books: propTypes.array.isRequired,
    srbooks: propTypes.array.isRequired,
    updateBookShelf: propTypes.func.isRequired,
    searchBooks: propTypes.func.isRequired,
    updateSearch: propTypes.func.isRequired
  }

  state = {
    query: ''
  }
  
  /**
  * @description Represents a function to update search query state
  */
  updateQuery = (query) => {
    this.setState({query: query.trim()})
    this.props.searchBooks(query, 20)
  }

  /**
  * @description Represents a function to update bookshelf 
  */
  onChange(book, e) {
    this.props.updateBookShelf(book, e.target.value)
  }

  /**
  * @description Represents a function to assignb default 
  * bookshelf to search results
  */
  assignBookShelf = (bookId) => {
    const srbooks = this.props.srbooks
    const bookIndex = srbooks.findIndex(b => b.id === bookId)
    return (srbooks instanceof Array && srbooks.length > 0 && bookIndex > 0)? srbooks[bookIndex].shelf :'none'
  }

  render() {
    const books = this.props.books
    
    return (
       <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" onClick={this.props.updateSearch} to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  
                */}
                <input 
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}
                ></input>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>

              {(books && books.length > 0) ? books.map((book) => (
                <div className="bookshelf-books" key={book.id}>
                  <ol className="books-grid">
                    <li>
                      <div className="book">
                        <div className="book-top">
                          {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks['thumbnail']})` }}></div>: null}
                          
                            <div className="book-shelf-changer">
                              <select onChange={(e) => this.onChange(book, e)} defaultValue={this.assignBookShelf(book.id)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                            <div className="book-authors">RATING : {book.averageRating}</div>
                        </div>
                    </li>
                  </ol>
                </div>
              )): <div><span>Please enter valid title or author name in the field above</span></div>}
            </div>
          </div>
    )
  }

}

export default SearchBooks
