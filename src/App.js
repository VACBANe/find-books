import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import "./App.css";
import Loader from "./Loader";
import Modal from "./components/Modal";

function App() {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currBook, setCurrBook] = useState("flowers+inauthor:keyes");
    const [lastItem, setLastItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [showModalSeacrch, setShowModalSeacrch] = useState(false);
    const [showModalMore, setShowModalMore] = useState(false);


    const onPageChanged = () => {
        setIsLoadingMore(true);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${currBook}&maxResults=9&startIndex=${lastItem}&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                if (response.data.items) {
                    let newBooks = [...books, ...response.data.items];
                    setBooks(newBooks);
                } else {
                    setShowModalMore(true);
                    document.body.style.overflow = "hidden";
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
                setBooks(response.data.items);
                setIsLoading(false);
            });
        setLastItem(lastItem + 9);
    }, []);

    const searchBook = () => {
        if (!searchText) {
            setShowModalSeacrch(true);
            document.body.style.overflow = "hidden";
            return;
        }
        setIsLoading(true);
        let search = searchText.replace(" ", "+").toLowerCase();
        setCurrBook(search);
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=9&key=AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4`
            )
            .then((response) => {
                setBooks(response.data.items);
                setIsLoading(false);
            });
        setSearchText("");
        setLastItem(lastItem + 9);
    };
    const closeModalSearch = () => {
        setShowModalSeacrch(false);
        document.body.style.overflow = "auto";
    };
    const closeModalMore = () => {
        setShowModalMore(false);
        document.body.style.overflow = "auto";
    };
    
    return (
        <div className="container">
            <h1>Book finder</h1>
            <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder={"Input book name"}
            />
            <button onClick={searchBook}>Search</button>
            <div style={{ marginTop: "20px" }}>{isLoading && <Loader />}</div>
            <div className="books">
                {books ?
                    books.map((book) => (
                        <Book
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors}
                            smallimg={book.volumeInfo.imageLinks?.thumbnail}
                            inStock={book.saleInfo.buyLink}
                        />
                    )) : <h1>Empty :(</h1>}
            </div>
            {isLoadingMore ? (
                <Loader />
            ) : (
                <button onClick={onPageChanged} style={{ marginTop: "20px" }}>
                    More
                </button>
            )}
            {showModalSeacrch && (
                <Modal
                    reason={"Field is empty"}
                    closeModal={closeModalSearch}
                />
            )}
            {showModalMore && (
                <Modal
                    reason={"No more books"}
                    closeModal={closeModalMore}
                />
            )}
        </div>
    );
}

export default App;

//AIzaSyDrkICrYDmr7VGdDa3dlc0BvTIus_4fTR4
