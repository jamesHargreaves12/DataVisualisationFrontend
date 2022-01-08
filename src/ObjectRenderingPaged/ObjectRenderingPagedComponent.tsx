import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ObjectRenderingCell from "../ObjectRenderingCell";
import {
  DATASETS,
  FileDetails,
  getFilteredFiles,
} from "../FileLoader/Datasets";
import { getCurrentPageDetails, useCardCellLayout } from "../util";
import { sendRemoveAllScenes } from "../OffscreenCanvasMiddleware";
import FilterBar, { FacetFilterProps } from "../FiltersBar/FilterBar";
import RightNav from "../RightNav/RightNav";
import TileDisplay, { TileComponent } from "../TileDisplay/TileDisplay";
import renderingSettingsContext from "../RenderingContext/RenderingContext";
import CSSColours from "../CSSColours";

const FileDetailsTile: TileComponent<FileDetails> = ({cellNumber, tileDetails}) => {
  const canvasId = `canvas-${cellNumber}`;
  const { datasetId } = useParams<{ datasetId: string }>();
  return (
    <ObjectRenderingCell
      canvasId={canvasId}
      objFileDetails={tileDetails}
      datasetId={datasetId}
      key={canvasId}
    />
  );
}


export default function ObjectRenderingPagedComponent() {
  const {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  } = useCardCellLayout();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchStatus, setSearchStatus] = useState("");
  const [datasetSpecifcFacetState, setDatasetSpecifcFacetState] = useState<
    Record<string, string[]>
  >({});
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const { setRotating } = useContext(renderingSettingsContext);
  const { datasetId } = useParams<{ datasetId: string }>();
  const dataset = DATASETS.find((d) => d.id === datasetId);
  if (!dataset) throw new Error("Unrecognised dataset"); 
  const unfilteredFileDetails = dataset.objs();
  const filteredFiles = getFilteredFiles(
    unfilteredFileDetails,
    searchStatus,
    datasetSpecifcFacetState
  );
  const facetKeys = Array.from(
    new Set(
      unfilteredFileDetails.reduce(
        (prev, cur) => [...prev, ...Object.keys(cur.datasetSpecificTags ?? {})],
        [] as string[]
      )
    )
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
 
  const facetFilterDetails: Omit<
    FacetFilterProps,
    "possibleValues"
  >[] = facetKeys.map((key) => ({
    selectedValues: datasetSpecifcFacetState[key] ?? [],
    setSelectedValues: (g: string[]) =>
      setDatasetSpecifcFacetState({
        ...datasetSpecifcFacetState,
        [key]: g,
      }),
    label: key,
  }));
  return (
    <div style={{ display: "flex", paddingLeft: "10px", width: "100%" }}>
      <div
        style={{
          paddingLeft: horizontalPadding,
          paddingTop: verticalPadding,
        }}
      >
        <FilterBar
          unfilteredFileDetails={unfilteredFileDetails}
          setSearchStatus={filterAndGoToFirstPage(setSearchStatus)}
          filterDetails={facetFilterDetails}
        />
        <TileDisplay
          groupedTileDetails={groupedFiles}
          setPage={(page: number) => {
            setRotating(false);
            sendRemoveAllScenes();
            setCurrentPage(page);
          }}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          TileComponent={FileDetailsTile}
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
          numberOfCellsOnPage={numberOfCellsOnPage}
          rightNavDefaultSettings={dataset.rightNavDefaultSettings}
        />
      </div>
    </div>
  );
}
