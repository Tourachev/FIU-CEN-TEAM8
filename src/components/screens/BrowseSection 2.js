import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import BookCard from '../BookCard';
import Pagination from 'react-js-pagination';
import Context from '../Context';

class BrowseSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            ogBooks: [],
            pageNumber: 1,
            booksPerPage: 10,
            activePage: 1,
            loading: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.updateBooksPerPage10 = this.updateBooksPerPage10.bind(this);
        this.updateBooksPerPage20 = this.updateBooksPerPage20.bind(this);
    }

    componentDidMount() {
        fetch('/books')
            .then(res => res.json())
            .then(books =>
                this.setState({ books: books, ogBooks: books, loading: false })
            );
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let newPage = pageNumber;
        this.setState({ activePage: newPage }, () => {
            console.log(this.state.activePage);
        });
        this.forceUpdate();
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let value = target.value;
        const ogList = this.state.ogBooks;

        if (name === 'rating') {
            value = parseInt(value);
        }

        if (isChecked === true) {
            let filteredList = this.state.books.filter(book => {
                if (book[name] === value) {
                    return true;
                } else {
                    return false;
                }
            });
            console.log(filteredList);
            this.setState({
                books: filteredList
            });
            this.forceUpdate();
        } else {
            this.setState({
                books: ogList
            });
            console.log('False');
        }
    }

    sortAlphabeticaly() {
        this.setState = this.state.books.sort((a, b) =>
            a.author > b.author ? 1 : -1
        );

        console.log(this.state.books);
    }

    sortAuthorA2Z(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.author > b.author ? 1 : -1
        );
        this.forceUpdate();
    }

    sortAuthorZ2A(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.author < b.author ? 1 : -1
        );
        this.forceUpdate();
    }

    sortTitleA2Z(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.title > b.title ? 1 : -1
        );
        this.forceUpdate();
    }

    sortTitleZ2A(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.title < b.title ? 1 : -1
        );
        this.forceUpdate();
    }

    sortPriceL2H(props) {
        this.setState = this.state.books.sort((a, b) => a.price - b.price);
        this.forceUpdate();
    }
    sortPriceH2L(props) {
        this.setState = this.state.books.sort((a, b) => b.price - a.price);
        this.forceUpdate();
    }

    sortDateL2H(props) {
        this.setState = this.state.books.sort((a, b) =>
            b.date < a.date ? 1 : -1
        );
        this.forceUpdate();
    }
    sortDateH2L(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.date < b.date ? 1 : -1
        );
        this.forceUpdate();
    }

    sortRatingL2H(props) {
        this.setState = this.state.books.sort((a, b) => a.rating - b.rating);
        this.forceUpdate();
    }

    sortRatingH2L(props) {
        this.setState = this.state.books.sort((a, b) => b.rating - a.rating);
        this.forceUpdate();
    }

    updateBooksPerPage10() {
        this.setState({ booksPerPage: '10' });
        this.forceUpdate();
    }

    updateBooksPerPage20() {
        this.setState({ booksPerPage: '20' });
        this.forceUpdate();
    }

    render() {
        const card = this.state.books
            .slice(
                (this.state.activePage - 1) * this.state.booksPerPage,
                this.state.activePage * this.state.booksPerPage
            )
            .map(book => (
                <Context.Consumer>
                    {context => (
                        <BookCard
                            username={context.username}
                            isLoggedIn={context.isLoggedIn}
                            bookID={book.bookid}
                            title={book.title}
                            image = {book.imagelink}
                            author={book.author}
                            genre={book.genre}
                            price={book.price}
                            rating={book.rating}
                            date={book.date}
                        />
                    )}
                </Context.Consumer>
            ));

        return (
            <div id='browse-container'>
                <div id='sidebar'>
                    <div>
                        <h2>Genre</h2>
                        <p>
                            Comedy{' '}
                            <input
                                name='genre'
                                value='Comedy'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Fantasy{' '}
                            <input
                                name='genre'
                                value='Fantasy'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Horror{' '}
                            <input
                                name='genre'
                                value='Horror'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Nonfiction{' '}
                            <input
                                name='genre'
                                value='Nonfiction'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Mystery{' '}
                            <input
                                name='genre'
                                value='Mystery'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Romance{' '}
                            <input
                                name='genre'
                                value='Romance'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            Sci-Fi{' '}
                            <input
                                name='genre'
                                value='Sci-Fi'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <hr />
                        <h3>
                            Top Sellers Only <input type='checkbox' />
                        </h3>
                        <hr />
                        <h2>Rating</h2>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='5'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='4'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='3'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='2'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='1'
                                type='checkbox'
                                onChange={event => this.handleInputChange(event)}
                            />
                        </p>
                    </div>
                </div>

                <div id='browse-body'>
                    <div id='nav-browse-body'>
                        <div class='dropdown'>
                            <button
                                type='button'
                                class='btn btn-lg btn-light dropdown-toggle'
                                data-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                            >
                                Sort By
                            </button>
                            <div class='dropdown-menu'>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortAuthorA2Z()}
                                >
                                    Author: A-Z
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortAuthorZ2A()}
                                >
                                    Author: Z-A
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortTitleA2Z()}
                                >
                                    Title: A-Z
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortTitleZ2A()}
                                >
                                    Title: Z-A
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortPriceL2H()}
                                >
                                    Price: Low-High
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortPriceH2L()}
                                >
                                    Price: High-Low
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortDateL2H()}
                                >
                                    Date: Old-New
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortDateH2L()}
                                >
                                    Date: New-Old
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortRatingL2H()}
                                >
                                    Rating: Low-High
                                </a>
                                <a
                                    class='dropdown-item'
                                    onClick={() => this.sortRatingH2L()}
                                >
                                    Rating: High-Low
                                </a>
                            </div>
                        </div>

                        <div class='dropdown'>
                            <button
                                type='button'
                                class='btn btn-lg btn-light dropdown-toggle'
                                data-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                            >
                                Books Per Page:
                            </button>
                            <div class='dropdown-menu'>
                                <a
                                    onClick={this.updateBooksPerPage10}
                                    class='dropdown-item'
                                    href='#'
                                >
                                    10
                                </a>
                                <a
                                    onClick={this.updateBooksPerPage20}
                                    class='dropdown-item'
                                    href='#'
                                >
                                    20
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className='sexy_line' />

                    <div id='card-body'>
                        {this.state.loading ? <CircularProgress /> : card}
                    </div>
                    <br />
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.booksPerPage}
                        totalItemsCount={this.state.books.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        linkClass='page-link'
                    />
                </div>
            </div>
        );
    }
}

export default BrowseSection;
