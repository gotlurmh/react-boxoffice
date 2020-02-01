import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

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
  list.map(rankid => (rankid.id = rank++));
  return list;
};

const sortCaret = (order, column) => {
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

const currencyFormat = num =>
  `$${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;

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
    sortCaret: sortCaret
  },
  {
    dataField: "distributorName",
    text: "Distributor Name",
    sort: true,
    sortCaret: sortCaret
  },
  {
    dataField: "weekendRev",
    text: "Weekend Total",
    sort: true,
    sortCaret: sortCaret,
    formatter: currencyFormat
  },
  {
    dataField: "locs",
    text: "# of Locs",
    sort: true,
    sortCaret: sortCaret
  },
  {
    dataField: "locAvg",
    text: "Loc Avg",
    sort: true,
    sortCaret: sortCaret,
    formatter: currencyFormat
  },
  {
    dataField: "cumeRev",
    text: "Cume Total",
    sort: true,
    sortCaret: sortCaret,
    formatter: currencyFormat
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
        className="form-control"
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
    <button className="btn btn-secondary" onClick={handleClick}>
      Export to CSV
    </button>
  );
};
class BoxOffice extends Component {
  constructor() {
    super();
    boxOfficeList = rankRecord(list);
  }
  render() {
    return (
      <div className="container">
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
              <ExportCSVButton {...props.csvProps} />
              Search:
              <SearchButton {...props.searchProps} />
              <BootstrapTable striped bordered={false} {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default BoxOffice;
