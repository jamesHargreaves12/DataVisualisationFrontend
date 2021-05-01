import React, { useEffect, useRef } from "react";
import { FileDetails } from "../ObjFileLoad";
import "./ObjectRenderingCellComponent.scss";
import { sendAddNewScene, sendRemoveScene } from "../OffscreenCanvasMiddleware";
import LoadingIndicator from "../LoadingIndicator";
import { PAGE_LAYOUT_CONFIG } from "../util";

export enum CellStatus {
  Unloaded,
  Loaded,
  Removed,
}
type ObjectRenderingCellProps = {
  canvasId: string;
  objFileDetails: FileDetails;

  cellStatus: CellStatus;
  reportCellStatusChange: (status: CellStatus) => void;
  currentTheme: string;
};

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

export default function ObjectRenderingCell(props: ObjectRenderingCellProps) {
  const defaultProps = { fov: 35 };
  const {
    fov,
    canvasId,
    objFileDetails,
    reportCellStatusChange,
    cellStatus,
    currentTheme,
  } = {
    ...defaultProps,
    ...props,
  };
  const wrapperId = `wrapper-${canvasId}`;
  const {
    widthCell,
    heightCell,
    cellMarginSize,
    cellPaddingSize,
    cellTitleHeight,
  } = PAGE_LAYOUT_CONFIG;
  useEffect(() => {
    reportCellStatusChange(CellStatus.Unloaded);
    const canvasDomElem = getNewCanvas(
      canvasId,
      wrapperId,
      widthCell,
      heightCell
    );
    sendAddNewScene(
      canvasDomElem,
      objFileDetails.filepath,
      widthCell,
      heightCell,
      currentTheme
    );
    return () => {
      sendRemoveScene(canvasId, objFileDetails.filepath);
      reportCellStatusChange(CellStatus.Removed);
    };
  }, [fov, objFileDetails.filename]);
  const cellLoading = cellStatus === CellStatus.Unloaded;
  return (
    <div
      className="object-rendering-group-cell"
      style={{ margin: cellMarginSize, padding: cellPaddingSize }}
    >
      <div
        className="object-rendering-group-cell__title"
        style={{ height: cellTitleHeight }}
      >
        {objFileDetails.title}
      </div>
      <div
        className={"object-rendering-group-cell__content"}
        style={{ width: widthCell, height: heightCell }}
      >
        <div
          id={wrapperId}
          style={{
            width: widthCell,
            height: heightCell,
            visibility: cellLoading ? "hidden" : "visible",
            display: cellLoading ? "none" : "block",
          }}
        />
        {cellLoading && (
          <LoadingIndicator width={widthCell} height={heightCell} />
        )}
      </div>
    </div>
  );
}
