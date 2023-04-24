import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const role = window.localStorage.getItem('role');

const SearchPage = () => {
	return (
        <div>
            <Navbar role={role} />
            <div className="search__container">
                <h1>Search Res</h1>
            </div>
        </div>
    )
};

export default SearchPage;
