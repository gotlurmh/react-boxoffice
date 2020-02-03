import React from "react";

const SortCaret = (order, column) => {
  if (!order)
    return (
      <span className="sortCaret">
        <font> &darr;&uarr;</font>
      </span>
    );
  else if (order === "asc")
    return (
      <span className="sortCaret">
        {" "}
        &darr;<font color="black">&uarr;</font>
      </span>
    );
  else if (order === "desc")
    return (
      <span className="sortCaret">
        {" "}
        <font color="black">&darr;</font>&uarr;
      </span>
    );
  return null;
};

export default SortCaret;
