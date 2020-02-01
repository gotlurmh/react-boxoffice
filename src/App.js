import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BoxOffice from "./components/tabs/BoxOffice";

function App() {
  return (
    <div className="App">
      <BoxOffice />
    </div>
  );
}

export default App;
