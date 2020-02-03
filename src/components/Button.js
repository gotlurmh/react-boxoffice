import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

const ExportExcelButton = props => {
  return (
    <ExcelFile element={<button className="btn btn-secondary">Excel</button>}>
      <ExcelSheet data={props.data} name="Box Office List">
        <ExcelColumn label="#" value="id" />
        <ExcelColumn label="Title" value="titleName" />
        <ExcelColumn label="Distributor Name" value="distributorName" />

        <ExcelColumn label="Weekend Total" value="weekendRev" />
        <ExcelColumn label="# of Locs" value="locs" />

        <ExcelColumn label="Loc Avg" value="locAvg" />
        <ExcelColumn label="Cume Total" value="cumeRev" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export { ExportCSVButton, ExportExcelButton };
