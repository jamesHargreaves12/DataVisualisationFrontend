import "./Colors.scss";
import React from "react";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ObjectRenderingPagedComponent from "./ObjectRenderingPaged/ObjectRenderingPagedComponent";
import { PAGE_LAYOUT_CONFIG } from "./util";
import { Switch, Route, useParams, Redirect } from "react-router-dom";
import DatasetDirectory from "./DatasetDirectory/DatasetDirectory";
import { DATASETS, getUrl } from "./FileLoader/Datasets";
import { Link } from "react-router-dom";
import { RenderingContextProvider } from "./RenderingContext/RenderingContext";
import DetailView from "./DetailView/DetailView";

function NavBar() {
  const { datasetId } = useParams<{ datasetId?: string }>();
  const datasetTitle = DATASETS.find(({ id }) => id === datasetId)?.title;
  const title = (
    <Link to={getUrl("/dataset")} style={{ color: "black" }}>
      Data Visualisation
    </Link>
  );

  if (datasetTitle)
    return (
      <div style={{ color: "black" }}>
        {title} {">"}{" "}
        <Link to={getUrl(`/dataset/${datasetId}`)} style={{ color: "black" }}>
          {datasetTitle}
        </Link>
      </div>
    );
  return <div style={{ color: "black" }}>{title}</div>;
}

function App() {
  return (
    <div className="App">
      <div
        className="nav-bar"
        style={{ height: PAGE_LAYOUT_CONFIG.topNavBarHeight }}
      >
        <Switch>
          <Route path={"/dataset/:datasetId"} exact={false}>
            <NavBar />
          </Route>
          <Route path={"/"} exact={false}>
            <NavBar />
          </Route>
        </Switch>
      </div>
      <div
        style={{
          paddingTop: "60px", //to encounter header
        }}
      >
        {/*a bit of a hack to get the routing to work locally and on ghpages easily */}
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
  // console.log(match);
  return (
    <RenderingContextProvider key={"detail"}>
      <Switch>
        <Route path={match.path + "dataset/:datasetId/:objId"} exact={false}>
          <DetailView />
        </Route>
        <Route path={match.path + "dataset/:datasetId"} exact={false}>
          <ObjectRenderingPagedComponent />
        </Route>
        <Route path={match.path + "dataset"} exact={false}>
          <DatasetDirectory />
        </Route>
        <Route path={match.path} exact={false}>
          <Fallback />
        </Route>
      </Switch>
    </RenderingContextProvider>
  );
}

function Fallback() {
  console.log("FALLBACK");
  return <Redirect to={getUrl("/dataset")} />;
}

export default App;
