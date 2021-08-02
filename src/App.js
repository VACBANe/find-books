import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import "./App.css";

function App() {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        axios
            .get(
                "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&maxResults=9&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4"
            )
            .then((response) => {
                console.log(response);
                setBooks(response.data.items);
            });
    }, []);
    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    };
    const searchBook = () => {
        let search = searchText.replace(" ", "+").toLowerCase();
        console.log(search);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${searchText}&maxResults=9&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                console.log(response);
                setBooks(response.data.items);
            });
        setSearchText("");
    };
    return (
        <div className="container">
            <h1>Book finder</h1>
            <input
                type="text"
                onChange={onChangeHandler}
                value={searchText}
                placeholder={"Input book name"}
            />
            <button onClick={searchBook}>Search</button>
            <div className="books">
                {books &&
                    books.map((book) => (
                        <Book
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors}
                            smallimg={book.volumeInfo.imageLinks?.thumbnail}
                            inStock={book.saleInfo.buyLink}
                        />
                    ))}
            </div>
        </div>
    );
}

export default App;

//AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4
