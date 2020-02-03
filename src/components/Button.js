import React from "react";

const ExportCSVButton = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      CSV
    </button>
  );
};

export { ExportCSVButton };
