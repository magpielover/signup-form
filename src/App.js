import React, { Component } from "react";
import "./App.css";
import SortableTable from "./components/SortableTable";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ width: "912px", margin: "0 auto" }}>
          <SortableTable />
        </div>
      </div>
    );
  }
}

export default App;
