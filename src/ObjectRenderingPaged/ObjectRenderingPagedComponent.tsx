import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ObjectRenderingCell from "../ObjectRenderingCell";
import { DATASETS, FileDetails, Gender, getFilteredFiles } from "../FileLoader";
import { getCurrentPageDetails, useCardCellLayout } from "../util";
import {
  sendRemoveAllScenes,
  sendSetRotate,
  workerNotifications,
} from "../OffscreenCanvasMiddleware";
import FilterBar from "../FiltersBar/FilterBar";
import RightNav from "../RightNav/RightNav";
import TileDisplay from "../TileDisplay/TileDisplay.";
import renderingSettingsContext from "../RenderingContext/RenderingContext";
import CSSColours from "../CSSColours";

export default function ObjectRenderingPagedComponent() {
  const {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  } = useCardCellLayout();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const { setRotating } = useContext(renderingSettingsContext);
  const { datasetId } = useParams<{ datasetId: string }>();
  const dataset = DATASETS.find((d) => d.id === datasetId);
  if (!dataset) throw new Error("Unrecognised dataset"); // TODO handle this gracefully
  const unfilteredFileDetails = dataset.objs;
  const filteredFiles = getFilteredFiles(
    unfilteredFileDetails,
    searchStatus,
    selectedGenders,
    selectedAgeRanges
  );
  filteredFiles.sort((a, b) => a.title.localeCompare(b.title));
  function filterAndGoToFirstPage<T>(filter: (x: T) => void) {
    return (val: T) => {
      setCurrentPage(0);
      filter(val);
    };
  }
  const { numberOfPages, getGroupsForPage } = getCurrentPageDetails(
    filteredFiles,
    cellsPerRow * rowCount,
    cellsPerRow
  );
  const groupedFiles = getGroupsForPage(currentPage);
  const numberOfCellsOnPage = groupedFiles.reduce(
    (acc, cur) => acc + cur.length,
    0
  );
  // TODO why isn't this just a seperate component?
  const renderTile = (cellNumber: number, tileDetails: FileDetails) => {
    const canvasId = `canvas-${cellNumber}`;
    return (
      <ObjectRenderingCell
        canvasId={canvasId}
        objFileDetails={tileDetails}
        datasetId={datasetId}
        key={canvasId}
      />
    );
  };

  return (
    <div style={{ display: "flex", paddingLeft: "10px", width: "100%" }}>
      <div
        style={{
          paddingLeft: horizontalPadding,
          paddingTop: verticalPadding,
        }}
      >
        <FilterBar
          selectedGenders={selectedGenders}
          unfilteredFileDetails={unfilteredFileDetails}
          selectedAgeRanges={selectedAgeRanges}
          setSearchStatus={filterAndGoToFirstPage(setSearchStatus)}
          setSelectedGenders={filterAndGoToFirstPage(setSelectedGenders)}
          setSelectedAgeRanges={filterAndGoToFirstPage(setSelectedAgeRanges)}
        />
        <TileDisplay
          groupedTileDetails={groupedFiles}
          renderTile={renderTile}
          setPage={(page: number) => {
            setRotating(false);
            sendRemoveAllScenes();
            setCurrentPage(page);
          }}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
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
        <RightNav numberOfCellsOnPage={numberOfCellsOnPage} />
      </div>
    </div>
  );
}
