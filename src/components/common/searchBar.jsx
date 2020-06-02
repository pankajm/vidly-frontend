import React from "react";

const SearchBar = ({ onSearch, value }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="search..."
        onChange={(e) => onSearch(e.currentTarget.value)}
        value={value}
      ></input>
    </div>
  );
};

export default SearchBar;
