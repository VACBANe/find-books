import React from "react";
import "./Book.css";
const Book = ({ title, authors, smallimg, inStock }) => {
    return (
        <div className="item">
            <div>
                <h3>{title}</h3>
                <p>{authors}</p>
            </div>
            <div>
            <img src={smallimg ? smallimg : "https://via.placeholder.com/128x200"} alt={title} />
            </div>
            <button onClick={() => {window.open(inStock, "_blank")}} disabled={inStock ? false : true}>Buy</button>
        </div>
    );
};

export default Book;
