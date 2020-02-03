import React from "react";

const SearchBar = props => {
  let input;
  const handleSearch = () => {
    props.onSearch(input.value);
  };
  return (
    <span className="col-sm">
      <input
        className="form-control"
        style={{ backgroundColor: "darkgrey" }}
        ref={n => (input = n)}
        type="text"
        onKeyUp={handleSearch}
      />
    </span>
  );
};

export default SearchBar;
