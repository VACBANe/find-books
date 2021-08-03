import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import "./App.css";
import Loader from "./Loader";

function App() {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currBook, setCurrBook] = useState("flowers+inauthor:keyes");
    const [lastItem, setLastItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    };

    const onPageChanged = () => {
        setIsLoadingMore(true);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${currBook}&maxResults=9&startIndex=${lastItem}&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                console.log(response.data);
                if (response.data.items) {
                    let newBooks = [...books, ...response.data.items];
                    setBooks(newBooks);
                } else {
                    alert("No results");
                }
                setIsLoadingMore(false);
            });
        setLastItem(lastItem + 9);
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${currBook}&maxResults=9&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                console.log(response);
                setBooks(response.data.items);
                setIsLoading(false);
            });
        setLastItem(lastItem + 9);
    }, []);

    const searchBook = () => {
        setIsLoading(true);
        let search = searchText.replace(" ", "+").toLowerCase();
        setCurrBook(search);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=9&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                console.log(response);
                setBooks(response.data.items);
                setIsLoading(false);
            });
        setSearchText("");
        setLastItem(lastItem + 9);
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
            <div style={{marginTop: "20px"}}>{isLoading && <Loader/>}</div>
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
            {isLoadingMore ? (
                <Loader />
            ) : (
                <button onClick={onPageChanged} style={{ marginTop: "20px" }}>
                    More
                </button>
            )}
        </div>
    );
}

export default App;

//AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4
