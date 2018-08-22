import React, { Component } from "react";
import { Consumer, Provider } from "../context";
import { Students } from "./Students";
import { Search } from "./Search";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="container">
          <h3>Students</h3>

          <div className="row">
            <div className="col">
              <Search />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Students />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
