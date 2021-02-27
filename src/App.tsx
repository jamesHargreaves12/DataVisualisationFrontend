import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ObjectRenderingGroup from "./ObjectRenderingPaged/ObjectRenderingPagedComponent";
import Parent from "./tmp/Parent";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">Data Visualisation</div>
      <ObjectRenderingGroup />
      {/*<Parent />*/}
    </div>
  );
}

export default App;
