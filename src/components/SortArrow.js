import React from "react";

const SortCaret = order => {
  if (!order)
    return (
      <span className="sortArrow">
        <font>&uarr;&darr;</font>
      </span>
    );
  else if (order === "desc")
    return (
      <span className="sortArrow">
        <font color="black">&uarr;</font>&darr;
      </span>
    );
  else if (order === "asc")
    return (
      <span className="sortArrow">
        &uarr;<font color="black">&darr;</font>
      </span>
    );
  return null;
};

export default SortCaret;
