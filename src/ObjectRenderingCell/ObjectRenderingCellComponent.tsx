import React, { useContext } from "react";
import { FileDetails, getUrl } from "../FileLoader/Datasets";
import "./ObjectRenderingCellComponent.scss";
import { PAGE_LAYOUT_CONFIG } from "../util";
import ObjectRenderingCanvas from "../ObjectRenderingCanvas/ObjectRenderingCanvas";
import CSSColours from "../CSSColours";
import { Link } from "react-router-dom";
import renderingSettingsContext from "../RenderingContext/RenderingContext";

type ObjectRenderingCellProps = {
  canvasId: string;
  datasetId: string;
  objFileDetails: FileDetails;
};

export default function ObjectRenderingCell(props: ObjectRenderingCellProps) {
  const { canvasId, objFileDetails, datasetId } = {
    ...props,
  };
  const {
    widthCell,
    heightCell,
    cellMarginSize,
    cellPaddingSize,
    cellTitleHeight,
  } = PAGE_LAYOUT_CONFIG;
  const { setRotating } = useContext(renderingSettingsContext);
  return (
    <Link
      to={getUrl(`/dataset/${datasetId}/${objFileDetails.id}`)}
      onClick={() => setRotating(false)}
    >
      <div
        style={{
          margin: cellMarginSize,
          padding: cellPaddingSize,
          backgroundColor: CSSColours.Primary5,
          borderRadius: "5px",
        }}
      >
        <div style={{ height: cellTitleHeight, color: CSSColours.Black }}>
          {objFileDetails.title}
        </div>
        <ObjectRenderingCanvas
          key={objFileDetails.id}
          width={widthCell}
          height={heightCell}
          canvasId={canvasId}
          objFileDetails={objFileDetails}
        />
      </div>
    </Link>
  );
}
