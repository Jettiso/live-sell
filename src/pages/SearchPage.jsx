import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const SearchPage = () => {
	return (
        <div>
            <Navbar />
            <div className="search__container">
                <h1>Search Res</h1>
            </div>
        </div>
    )
};

export default SearchPage;
