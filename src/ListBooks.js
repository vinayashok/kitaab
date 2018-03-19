import React from "react"

import { Link } from "react-router-dom"
import propTypes from "prop-types"
import sortBy from "sort-by"

/**
* @description Represents a books list react component 
*/
class ListBooks extends React.Component {
  
  static propTypes = {
    books: propTypes.array.isRequired,
    updateBookShelf: propTypes.func.isRequired
  }
  
  /**
  * @description 
  * @param {string} book - book object that needs to be updated.
  * @param {string} e - event object.
  */
  onChange(book, e) {
    this.props.updateBookShelf(book, e.target.value)
  }

  render() {
    const books = this.props.books
    let currentlyReading = books.filter( book => book.shelf === 'currentlyReading').sort(sortBy('title'))
    let read = books.filter( book => book.shelf === 'read').sort(sortBy('title'))
    let wantToRead = books.filter( book => book.shelf === 'wantToRead').sort(sortBy('title'))
 
    return (
       <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    {currentlyReading.map((book) => (
                      <div className="bookshelf-books" key={book.id}>
                        <ol className="books-grid">
                          <li>
                            <div className="book">
                              <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks['thumbnail']})` }}></div>: null}
                                <div className="book-shelf-changer">
                                  <select onChange={(e) => this.onChange(book, e)} defaultValue={book.shelf}>
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
                    ))}
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    {wantToRead.map((book) => (
                      <div className="bookshelf-books" key={book.id}>
                        <ol className="books-grid">
                          <li>
                            <div className="book">
                              <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks['thumbnail']})` }}></div>: null}
                                <div className="book-shelf-changer">
                                  <select onChange={(e) => this.onChange(book, e)} defaultValue={book.shelf}>
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
                    ))}
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    {read.map((book) => (
                      <div className="bookshelf-books" key={book.id}>
                        <ol className="books-grid">
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks['thumbnail']})` }}></div>: null}
                                <div className="book-shelf-changer">
                                  <select onChange={(e) => this.onChange(book, e)} defaultValue={book.shelf}>
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
                    ))} 
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }
}

export default ListBooks
