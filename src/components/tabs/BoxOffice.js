import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import SortCaret from "../SortArrow";
import SearchBar from "../SearchBar";
import { ExportCSVButton } from "../Button";

const formatTableData = rows => {
  const numberFormat = num =>
    `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  // sort rows based on weekendRev
  rows.sort((a, b) => b.weekendRev - a.weekendRev);

  // add rank and format columns
  let rank = 1;
  rows.forEach(row => {
    row.id = rank++;
    row.weekendRev = "$" + numberFormat(row.weekendRev);
    row.locs = numberFormat(row.locs);
    row.locAvg = "$" + numberFormat(row.locAvg);
    row.cumeRev = "$" + numberFormat(row.cumeRev);
  });
  return rows;
};

const columns = [
  {
    dataField: "id",
    text: "#",
    headerAlign: (column, colIndex) => "left",
    align: "left",
    style: {
      width: "10px"
    }
  },
  {
    dataField: "titleName",
    text: "Title",
    sort: true,
    sortCaret: SortCaret
  },
  {
    dataField: "distributorName",
    text: "Distributor Name",
    sort: true,
    sortCaret: SortCaret
  },
  {
    dataField: "weekendRev",
    text: "Weekend Total",
    sort: true,
    sortCaret: SortCaret
  },
  {
    dataField: "locs",
    text: "# of Locs",
    sort: true
  },
  {
    dataField: "locAvg",
    text: "Loc Avg",
    sort: true,
    sortCaret: SortCaret
  },
  {
    dataField: "cumeRev",
    text: "Cume Total",
    sort: true,
    sortCaret: SortCaret
  }
];

let boxOfficeList;

class BoxOffice extends Component {
  constructor(props) {
    super(props);
    boxOfficeList = formatTableData(props.list);
  }
  render() {
    return (
      <div>
        <ToolkitProvider
          className="container"
          sort={{ dataField: "weekendRev", order: "desc" }}
          keyField="id"
          data={boxOfficeList}
          columns={columns}
          search
          exportCSV={{
            onlyExportFiltered: true,
            exportAll: false
          }}
        >
          {props => (
            <div>
              <input
                value={this.state.value}
                onChange={({ target: { value } }) =>
                  this.setState({ value, copied: false })
                }
              />
              <ExportCSVButton {...props.csvProps} />
              Search:
              <SearchBar {...props.searchProps} />
              <BootstrapTable striped bordered={false} {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default BoxOffice;
