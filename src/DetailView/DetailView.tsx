import ObjectRenderingCanvas from "../ObjectRenderingCanvas/ObjectRenderingCanvas";
import { useContentLayout } from "../util";
import CSSColours from "../CSSColours";
import RightNav from "../RightNav/RightNav";
import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DATASETS, getUrl } from "../FileLoader/Datasets";
import renderingSettingsContext from "../RenderingContext/RenderingContext";
import { ICONS } from "../FileLoader/Icons";

export default function DetailView() {
  const { contentAreaWidth, contentAreaHeight } = useContentLayout(true);
  const size = Math.floor(Math.min(contentAreaWidth, contentAreaHeight) * 0.8);
  const { setRotating } = useContext(renderingSettingsContext);

  const { objId, datasetId } = useParams<{
    objId: string;
    datasetId: string;
  }>();
  const currentDataSet = DATASETS.find(({ id }) => id === datasetId);
  if (!currentDataSet) throw new Error("Dataset not found");
  const fileDetails = currentDataSet.objs().find(({ id }) => id === objId);
  if (!fileDetails) throw new Error("File not found");

  // This could be dried up a bit as it is initially copied from object rendering paged component but at this point there
  // is a question over whether we want to tie these two pages together or just leave as wet.
  const padding = 10;
  const titleHeight = 25;
  const width = size + padding * 2;
  if (!contentAreaWidth || !contentAreaHeight) return null;
  return (
    <div style={{ display: "flex", paddingLeft: "10px", width: "100%" }}>
      <div
        style={{
          backgroundColor: CSSColours.Primary5,
          width: width,
          borderRadius: "10px",
          marginTop: "10px",
          marginLeft: (contentAreaWidth - width) / 2,
          padding: padding,
        }}
      >
        <div style={{ height: titleHeight, color: CSSColours.Black }}>
          {fileDetails.title}
          <Link
            to={getUrl(`/dataset/${datasetId}`)}
            style={{
              color: CSSColours.Black,
              float: "left",
              marginLeft: "10px",
            }}
            onClick={() => setRotating(false)}
          >
            <img src={ICONS.prevArrow} height={"15px"} />
          </Link>
        </div>
        <ObjectRenderingCanvas
          width={size}
          height={size}
          canvasId={"detail-canvas"}
          objFileDetails={fileDetails}
          key={fileDetails.id}
          includeDescription={true}
        />
      </div>
      <div
        style={{
          backgroundColor: CSSColours.Primary4,
          right: 0,
          position: "fixed",
          height: "100%",
          width: "300px",
        }}
      >
        <RightNav
          numberOfCellsOnPage={1}
          rightNavDefaultSettings={currentDataSet.rightNavDefaultSettings}
        />
      </div>
    </div>
  );
}
