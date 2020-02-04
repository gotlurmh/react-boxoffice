import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import SortCaret from "../SortArrow";
import SearchBar from "../SearchBar";
import { ExportCSVButton, ExportExcelButton, CopyButton } from "../Button";

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

const numberSort = (item1, item2, order, dataField) => {
  const a = Number(item1.replace(/[$,]/g, ""));
  const b = Number(item2.replace(/[$,]/g, ""));

  if (order === "asc") {
    return b - a;
  }
  return a - b; // desc
};

const customTotal = (from, to, size) =>
  size < boxOfficeList.length ? (
    <span className="react-bootstrap-table-pagination-total">
      {` Showing ${from} to ${to} of ${size} entries (filtered from
      ${boxOfficeList.length} total entries)`}
    </span>
  ) : (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} entries
    </span>
  );
//const pageButtonRenderer = ({

const options = {
  paginationTotalRenderer: customTotal,
  hideSizePerPage: true,
  withFirstAndLast: false,
  showTotal: true,
  hidePageListOnlyOnePage: true,
  sizePerPageList: [
    {
      text: "20",
      value: 20
    },
    {
      text: "40",
      value: 40
    }
    //add all
  ]
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
    sortCaret: SortCaret,
    sortFunc: numberSort
  },
  {
    dataField: "locs",
    text: "# of Locs",
    sort: true,
    sortCaret: SortCaret,
    sortFunc: numberSort
  },
  {
    dataField: "locAvg",
    text: "Loc Avg",
    sort: true,
    sortCaret: SortCaret,
    sortFunc: numberSort
  },
  {
    dataField: "cumeRev",
    text: "Cume Total",
    sort: true,
    sortCaret: SortCaret,
    sortFunc: numberSort
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
              <ExportExcelButton data={boxOfficeList} />
              <ExportCSVButton {...props.csvProps} />
              <CopyButton data={boxOfficeList} headings={columns} />
              <SearchBar {...props.searchProps} />
              <BootstrapTable
                striped
                bordered={false}
                {...props.baseProps}
                pagination={paginationFactory(options)}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default BoxOffice;
