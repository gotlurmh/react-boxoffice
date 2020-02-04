import React from "react";

const SearchBar = props => {
  let input;
  const handleSearch = () => {
    props.onSearch(input.value);
  };
  return (
    <div className="col-sm searchbar">
      <label data-reactid="search">SEARCH:</label>
      <input
        className="form-control searchinput"
        data-reactid="search"
        ref={n => (input = n)}
        type="text"
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
