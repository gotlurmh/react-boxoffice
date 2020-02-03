import React from "react";

const SortCaret = order => {
  if (!order)
    return (
      <span className="sortArrow">
        <font> &darr;&uarr;</font>
      </span>
    );
  else if (order === "asc")
    return (
      <span className="sortArrow">
        {" "}
        &darr;<font color="black">&uarr;</font>
      </span>
    );
  else if (order === "desc")
    return (
      <span className="sortArrow">
        {" "}
        <font color="black">&darr;</font>&uarr;
      </span>
    );
  return null;
};

export default SortCaret;
