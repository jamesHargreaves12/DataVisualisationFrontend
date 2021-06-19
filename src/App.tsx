import "./Colors.scss";
import React from "react";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ObjectRenderingPagedComponent from "./ObjectRenderingPaged/ObjectRenderingPagedComponent";
import "./tmp/prototypes.js";
import { PAGE_LAYOUT_CONFIG } from "./util";
import { Switch, Route, useParams, Redirect } from "react-router-dom";
import DatasetDirectory from "./DatasetDirectory/DatasetDirectory";
import { getUrl } from "./FileLoader";
import { Link } from "react-router-dom";
import { RenderingContextProvider } from "./RenderingContext/RenderingContext";
import DetailView from "./DetailView/DetailView";

function App() {
  return (
    <div className="App">
      <div
        className="nav-bar"
        style={{ height: PAGE_LAYOUT_CONFIG.topNavBarHeight }}
      >
        <Link to={getUrl("/dataset")} style={{ color: "black" }}>
          Data Visualisation
        </Link>
      </div>
      <div
        style={{
          paddingTop: "60px", //to encounter header
        }}
      >
        {/*todo a bit of a hack to get the routing to work locally and on ghpages easily */}
        <Switch>
          <Route
            path={"/DataVisualisationFrontend/"}
            exact={false}
            component={AppRouting}
          />
          <Route path={"/"} exact={false} component={AppRouting} />
        </Switch>
      </div>
    </div>
  );
}

function AppRouting({ match }: { match: { path: string } }) {
  console.log(match);
  return (
    <Switch>
      <Route path={match.path + "dataset/:datasetId/:objId"} exact={false}>
        <RenderingContextProvider key={"detail"}>
          <DetailView />
        </RenderingContextProvider>
      </Route>
      <Route path={match.path + "dataset/:datasetId"} exact={false}>
        <RenderingContextProvider key={"paged objs"}>
          <ObjectRenderingPagedComponent />
        </RenderingContextProvider>
      </Route>
      <Route path={match.path + "dataset"} exact={false}>
        <DatasetDirectory />
      </Route>
      <Route path={match.path + ":other"} exact={false}>
        <Fallback />
      </Route>
    </Switch>
  );
}

function Fallback() {
  console.log("FALLBACK");
  return <Redirect to={getUrl("/dataset")} />;
}

export default App;
