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
  const descriptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("Unloaded", canvasId);
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

  useEffect(() => {
    if (descriptionRef.current)
      descriptionRef.current.innerHTML = objFileDetails.description;
  }, []);

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
          ref={descriptionRef}
          style={{
            backgroundColor: CSSColours.Primary5,
            paddingTop: "10px",
            textAlign: "left",
          }}
        ></div>
      )}
    </div>
  );
}
