import "./Colors.scss";
import React from "react";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ObjectRenderingGroup from "./ObjectRenderingPaged/ObjectRenderingPagedComponent";
import "./tmp/prototypes.js";
import { PAGE_LAYOUT_CONFIG } from "./util";

function App() {
  return (
    <div className="App">
      <div
        className="nav-bar"
        style={{ height: PAGE_LAYOUT_CONFIG.topNavBarHeight }}
      >
        Data Visualisation
      </div>
      <ObjectRenderingGroup />
    </div>
  );
}

export default App;
