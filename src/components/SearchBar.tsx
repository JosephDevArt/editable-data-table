// components/SearchBar.jsx
import React, { useContext } from "react";
import { TableContext } from "./App";
import { ITableContext } from "../types";

interface IPropos {
  searchTerm: string;
}

const SearchBar = ({ searchTerm }: IPropos) => {
  const { handleSearch } = useContext(TableContext) as ITableContext;

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchBar;
