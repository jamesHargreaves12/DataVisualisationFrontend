import { Dataset, DATASETS, getUrl } from "../FileLoader/Datasets";
import CSSColours from "../CSSColours";
import {
  getCurrentPageDetails,
  PAGE_LAYOUT_CONFIG,
  useCardCellLayout,
} from "../util";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TileDisplay, {TileComponent} from "../TileDisplay/TileDisplay";

const DatasetTile: TileComponent<Dataset> = ({cellNumber, tileDetails}) => {
  const {
    widthCell,
    heightCell,
    cellMarginSize,
    cellPaddingSize,
    cellTitleHeight,
  } = PAGE_LAYOUT_CONFIG;

  return (
    <Link to={getUrl(`/dataset/${tileDetails.id}`)} key={tileDetails.id}>
      <div
        style={{
          margin: cellMarginSize,
          padding: cellPaddingSize,
          backgroundColor: CSSColours.Primary5,
          borderRadius: 5,
        }}
      >
        <div style={{ height: cellTitleHeight, color: "black" }}>
          {tileDetails.title}
        </div>
        <div style={{ width: widthCell, height: heightCell }}>
          <img
            src={tileDetails.heatMapSource}
            style={{ maxHeight: heightCell, maxWidth: widthCell }}
          />
        </div>
      </div>
    </Link>
  );
};


export default function DatasetDirectory() {
  const {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  } = useCardCellLayout(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { numberOfPages, getGroupsForPage } = getCurrentPageDetails(
    DATASETS,
    cellsPerRow * rowCount,
    cellsPerRow
  );
  const groupedDatasets = getGroupsForPage(currentPage);

  return (
    <div
      style={{ paddingLeft: horizontalPadding, paddingTop: verticalPadding }}
    >
      <TileDisplay
        groupedTileDetails={groupedDatasets}
        setPage={setCurrentPage}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        TileComponent={DatasetTile}
      />
    </div>
  );
}
