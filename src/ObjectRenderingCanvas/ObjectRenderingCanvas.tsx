import React, { useContext, useEffect, useRef } from "react";
import LoadingIndicator from "../LoadingIndicator";
import CSSColours from "../CSSColours";
import { sendAddNewScene, sendRemoveScene } from "../OffscreenCanvasMiddleware";
import { FileDetails } from "../FileLoader/Datasets";
import renderingSettingsContext, {
  CanvasStatus,
} from "../RenderingContext/RenderingContext";

const getNewCanvas = (
  canvasId: string,
  wrapperId: string,
  width: number,
  height: number
) => {
  // NOTE THIS IS NOT AT ALL WHAT YOU WANT TO DO IN REACT
  // In this case it makes sense as we need to have a new canvas
  // (We need a new one to transfer control back to off screen);

  // This will not remove anything on the first render
  document.getElementById(canvasId)?.remove();
  const newCanvas = document.createElement("canvas");
  newCanvas.id = canvasId;
  newCanvas.width = width;
  newCanvas.height = height;
  const wrapperDiv = document.getElementById(wrapperId);
  if (!wrapperDiv) {
    throw new Error("Couldn't find wrapper Div");
  }
  wrapperDiv.appendChild(newCanvas);
  return newCanvas;
};

type ObjectRenderingCanvasProps = {
  width: number;
  height: number;
  canvasId: string;
  objFileDetails: FileDetails;
  includeDescription?: boolean;
};

export default function ObjectRenderingCanvas({
  canvasId,
  objFileDetails,
  width,
  height,
  includeDescription,
}: ObjectRenderingCanvasProps) {
  const wrapperId = `wrapper-${canvasId}`;
  const { currentTheme, canvasStatuses, reportCanvasStatusChange } = useContext(
    renderingSettingsContext
  );
  const canvasLoaded = canvasStatuses[canvasId] === CanvasStatus.Loaded;
  useEffect(() => {
    // console.log("Unloaded", canvasId);
    reportCanvasStatusChange(canvasId, CanvasStatus.Unloaded);
    const canvasDomElem = getNewCanvas(canvasId, wrapperId, width, height);
    sendAddNewScene(
      canvasDomElem,
      objFileDetails.filepath,
      width,
      height,
      currentTheme
    );
    return () => {
      console.log("Removed", canvasId);
      reportCanvasStatusChange(canvasId, CanvasStatus.Removed);
      sendRemoveScene(canvasId, objFileDetails.filepath);
    };
  }, [objFileDetails.filepath]);

  return (
    <div
      style={{
        width: width,
        backgroundColor: CSSColours.Primary2,
      }}
    >
      <div
        id={wrapperId}
        style={{
          width: width,
          height: height,
          visibility: !canvasLoaded ? "hidden" : "visible",
          display: !canvasLoaded ? "none" : "block",
        }}
      />
      {!canvasLoaded && <LoadingIndicator width={width} height={height} />}
      {objFileDetails.description && includeDescription && (
        <div
          style={{
            backgroundColor: CSSColours.Primary5,
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          <p>{objFileDetails.description}</p>
          
          {objFileDetails.min != undefined && objFileDetails.max != undefined && (
            <p>The minimum value in the data is {objFileDetails.min} and the maximum value is {objFileDetails.max}. </p>
          )}
          <p>
            This visualisation was produced from the data{" "}
            <a href={objFileDetails.src}>here</a>.
          </p>
          <p>
            For more information, the source code that created this 3D shape from the raw dataset is here{" "}
            <a href="https://github.com/jamesHargreaves12/DataVis_python">
              https://github.com/jamesHargreaves12/DataVis_python
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
