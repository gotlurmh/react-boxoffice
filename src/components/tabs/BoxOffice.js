import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Pagination from "react-bootstrap-table2-paginator";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const list = [
  {
    titleName: "Fast & Furious Presents: Hobbs & Shaw",
    distributorName: "Universal",
    weekendRev: 60800000,
    locs: 4253,
    locAvg: 14296,
    cumeRev: 60800000
  },
  {
    titleName: "Lion King, The",
    distributorName: "Disney",
    weekendRev: 38246000,
    locs: 4802,
    locAvg: 7965,
    cumeRev: 430889078
  },
  {
    titleName: "Once Upon A Time In Hollywood",
    distributorName: "Sony",
    weekendRev: 20025000,
    locs: 3659,
    locAvg: 5473,
    cumeRev: 78842475
  },
  {
    titleName: "Spider-Man: Far From Home",
    distributorName: "Sony",
    weekendRev: 7755000,
    locs: 3446,
    locAvg: 2250,
    cumeRev: 360328925
  },
  {
    titleName: "Toy Story 4",
    distributorName: "Disney",
    weekendRev: 7150000,
    locs: 3225,
    locAvg: 2217,
    cumeRev: 410050743
  },
  {
    titleName: "Yesterday",
    distributorName: "Universal",
    weekendRev: 2440000,
    locs: 1837,
    locAvg: 1328,
    cumeRev: 67902655
  },
  {
    titleName: "Farewell, The",
    distributorName: "A24",
    weekendRev: 2429114,
    locs: 409,
    locAvg: 5939,
    cumeRev: 6842321
  },
  {
    titleName: "Crawl",
    distributorName: "Paramount",
    weekendRev: 2150000,
    locs: 2085,
    locAvg: 1031,
    cumeRev: 36090773
  },
  {
    titleName: "Aladdin",
    distributorName: "Disney",
    weekendRev: 2018000,
    locs: 1370,
    locAvg: 1473,
    cumeRev: 350369592
  },
  {
    titleName: "Annabelle Comes Home",
    distributorName: "Warner Bros.",
    weekendRev: 875000,
    locs: 919,
    locAvg: 952,
    cumeRev: 71575112
  },
  {
    titleName: "Secret Life Of Pets 2, The",
    distributorName: "Universal",
    weekendRev: 730000,
    locs: 779,
    locAvg: 937,
    cumeRev: 155409025
  },
  {
    titleName: "Stuber",
    distributorName: "20th Century Fox",
    weekendRev: 506000,
    locs: 1080,
    locAvg: 469,
    cumeRev: 21752533
  }
];

const rankRecord = list => {
  list.sort((a, b) => b.weekendRev - a.weekendRev);

  let rank = 1;
  list.map(row => {
    row.id = rank++;
    row.weekendRev = `$${numberFormat(row.weekendRev)}`;
    row.locAvg = `$${numberFormat(row.locAvg)}`;
    row.cumeRev = `$${numberFormat(row.cumeRev)}`;
    row.locs = numberFormat(row.locs);
  });
  return list;
};

const sortArrow = (order, column) => {
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

const numberFormat = num =>
  `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

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
    sortArrow: sortArrow
  },
  {
    dataField: "distributorName",
    text: "Distributor Name",
    sort: true,
    sortArrow: sortArrow
  },
  {
    dataField: "weekendRev",
    text: "Weekend Total",
    sort: true,
    sortArrow: sortArrow
  },
  {
    dataField: "locs",
    text: "# of Locs",
    sort: true,
    sortArrow: sortArrow
  },
  {
    dataField: "locAvg",
    text: "Loc Avg",
    sort: true,
    sortArrow: sortArrow
  },
  {
    dataField: "cumeRev",
    text: "Cume Total",
    sort: true,
    sortArrow: sortArrow
  }
];

let boxOfficeList;

const SearchButton = props => {
  let input;
  const handleSearch = () => {
    props.onSearch(input.value);
  };
  return (
    <span className="col-sm">
      <input
        className="form-control form-control-sm bg-secondary text-left m-0"
        style={{ backgroundColor: "darkgrey" }}
        ref={n => (input = n)}
        type="text"
        onKeyUp={handleSearch}
      />
    </span>
  );
};

const ExportCSVButton = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <button
      className="btn btn-secondary btn-sm float-left mr-0h mb-0h border-white"
      onClick={handleClick}
    >
      CSV
    </button>
  );
};

const pageTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing {from} to {to} of {size} Results
  </span>
);

const option = {
  paginationTotalRenderer: pageTotal,
  showTotal: true,
  hideSizePerPage: false,
  alwaysShowAllBtns: false
  //   withFirstAndLast: false
};

class BoxOffice extends Component {
  constructor() {
    super();
    boxOfficeList = rankRecord(list);
    this.state = {
      value: "",
      copied: false
    };
  }
  render() {
    return (
      <div className="container">
        <ExcelFile
          element={
            <button className="btn btn-secondary btn-sm float-left mr-0h mb-0h border-white">
              Excel
            </button>
          }
        >
          <ExcelSheet data={boxOfficeList} name="Boxoffice">
            <ExcelColumn
              label="#"
              value="id"
              style={{ style: { font: { bold: true } } }}
            />
            <ExcelColumn label="Title" value="titleName" />
            <ExcelColumn label="Distributor Name" value="distributorName" />
            <ExcelColumn label="Weekend Total" value="weekendRev" />
            <ExcelColumn label="# of Locs" value="locs" />
            <ExcelColumn label="Loc Avg" value="locAvg" />
            <ExcelColumn label="Cume Total" value="cumeRev" />
          </ExcelSheet>
        </ExcelFile>
        <CopyToClipboard
          className="btn btn-secondary btn-sm float-left mr-0h mb-0h border-white"
          text={this.state.props}
          onCopy={() => this.setState({ copied: true })}
        >
          {/* <span>Copy to clipboard with span</span>
              </CopyToClipboard>
              <CopyToClipboard
                text={this.state.value}
                onCopy={() => this.setState({ copied: true })}
              > */}
          <button>Copy</button>
        </CopyToClipboard>
        {this.state.copied ? (
          <span style={{ color: "red" }}>Copied.</span>
        ) : null}
        <ToolkitProvider
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
              <label className="float-left">
                Search:
                <SearchButton {...props.searchProps} />
              </label>

              <BootstrapTable
                striped
                bordered={false}
                {...props.baseProps}
                pagination={Pagination(option)}
                className="dataTable table"
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default BoxOffice;
