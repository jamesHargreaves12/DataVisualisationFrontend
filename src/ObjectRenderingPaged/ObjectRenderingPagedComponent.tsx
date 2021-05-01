import React, { useEffect, useState } from "react";
import ObjectRenderingCell from "../ObjectRenderingCell";
import {
  filenameToDetails,
  Gender,
  getFilteredFiles,
  MATERIAL_FILEPATHS,
  OBJ_FILENAMES,
} from "../ObjFileLoad";
import { batchArray, PAGE_LAYOUT_CONFIG, useWindowSize } from "../util";
import "./ObjectRenderingPagedComponent.scss";
import {
  sendChangeMaterial,
  sendRemoveAllScenes,
  sendSetRotate,
  workerNotifications,
} from "../OffscreenCanvasMiddleware";
import { CellStatus } from "../ObjectRenderingCell/ObjectRenderingCellComponent";
import FilterBar from "../FiltersBar/FilterBar";
import PagingBar from "../PagingBar";
import RightNav from "../RightNav/RightNav";

const useCellStatus = () => {
  const [cellStatusTracker, setCellStatusTracker] = useState<
    Record<string, CellStatus>
  >({});
  const updateCellStatus = (id: string, value: CellStatus) =>
    setCellStatusTracker((current) => ({ ...current, [id]: value }));

  useEffect(() => {
    const subscriptionId = "useCellStatus";
    workerNotifications.subscribe(
      "canvasRendered",
      subscriptionId,
      ({ canvasId }: { canvasId: string }) => {
        updateCellStatus(canvasId, CellStatus.Loaded);
      }
    );
    return () =>
      workerNotifications.unsubscribe("canvasRendered", subscriptionId);
  }, []);

  const loadedCount = Object.values(cellStatusTracker).filter(
    (x) => x === CellStatus.Loaded
  ).length;
  return { loadedCount, updateCellStatus, cellStatusTracker };
};

const useObjectCellLayout = () => {
  const windowSize = useWindowSize();
  if (!windowSize.width) {
    return {
      cellsPerRow: 1,
      horizontalPadding: 0,
      verticalPadding: 0,
      rowCount: 1,
    };
  }
  if (!windowSize.height) {
    return {
      cellsPerRow: 1,
      horizontalPadding: 0,
      verticalPadding: 0,
      rowCount: 1,
    };
  }
  const {
    widthCell,
    heightCell,
    cellMarginSize,
    cellPaddingSize,
    rightNavWidth,
    topNavBarHeight,
    filterBarHeight,
    pagingBarHeight,
    cellTitleHeight,
  } = PAGE_LAYOUT_CONFIG;
  const totalCellWidth = 2 * cellMarginSize + 2 * cellPaddingSize + widthCell;
  const totalPageWidth = windowSize.width - rightNavWidth;
  const cellsPerRow = Math.floor(totalPageWidth / totalCellWidth);
  const horizontalPadding = (totalPageWidth % totalCellWidth) / 2;

  const totalCellHeight =
    2 * cellMarginSize + 2 * cellPaddingSize + heightCell + cellTitleHeight;
  const totalPageHeight =
    windowSize.height - topNavBarHeight - filterBarHeight - pagingBarHeight;
  const rowCount = Math.floor(totalPageHeight / totalCellHeight);
  const verticalPadding = (totalPageHeight % totalCellHeight) / 2;
  return {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  };
};

const useRotating = () => {
  const [isRotating, setIsRotating] = useState(false);
  const setRotating = (val: boolean) => {
    sendSetRotate(val);
    setIsRotating(val);
  };
  return { isRotating, setRotating };
};

export default function ObjectRenderingGroup() {
  const {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  } = useObjectCellLayout();
  const { isRotating, setRotating } = useRotating();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(MATERIAL_FILEPATHS[0]);

  const { loadedCount, updateCellStatus, cellStatusTracker } = useCellStatus();
  const unfilteredFileDetails = OBJ_FILENAMES.map((f) => filenameToDetails(f));
  const filteredFiles = getFilteredFiles(
    unfilteredFileDetails,
    searchStatus,
    selectedGenders,
    selectedAgeRanges
  );
  const changeTheme = (fp: string) => {
    setCurrentTheme(fp);
    sendChangeMaterial(fp);
  };

  filteredFiles.sort((a, b) => a.title.localeCompare(b.title));
  function filterAndGoToFirstPage<T>(filter: (x: T) => void) {
    return (val: T) => {
      setCurrentPage(0);
      filter(val);
    };
  }
  const pagedFiles = batchArray(filteredFiles, cellsPerRow * rowCount);
  const currentPageFiles = pagedFiles[currentPage];
  const groupedFileNames = batchArray(currentPageFiles, cellsPerRow);
  const allCellsLoaded = loadedCount === currentPageFiles.length;
  return (
    <div className="object-rendering-group">
      <div
        className="object-rendering-group__main-content"
        style={{ paddingLeft: horizontalPadding, paddingTop: verticalPadding }}
      >
        <FilterBar
          selectedGenders={selectedGenders}
          unfilteredFileDetails={unfilteredFileDetails}
          selectedAgeRanges={selectedAgeRanges}
          setSearchStatus={filterAndGoToFirstPage(setSearchStatus)}
          setSelectedGenders={filterAndGoToFirstPage(setSelectedGenders)}
          setSelectedAgeRanges={filterAndGoToFirstPage(setSelectedAgeRanges)}
        />
        {groupedFileNames.map((group, indexGroup) => (
          <div className="object-rendering-group__row" key={indexGroup}>
            {group.map((fileDetails, index) => {
              const cellNumber = indexGroup * cellsPerRow + index;
              const canvasId = `canvas-${cellNumber}`;
              return (
                <ObjectRenderingCell
                  canvasId={canvasId}
                  objFileDetails={fileDetails}
                  key={canvasId}
                  cellStatus={cellStatusTracker[canvasId]}
                  reportCellStatusChange={(x) => updateCellStatus(canvasId, x)}
                  currentTheme={currentTheme}
                />
              );
            })}
          </div>
        ))}

        <PagingBar
          setPage={(page: number) => {
            setRotating(false);
            sendRemoveAllScenes();
            setCurrentPage(page);
          }}
          currentPage={currentPage}
          totalPages={pagedFiles.length}
        />
      </div>
      <div className={"object-rendering-group__right-nav"}>
        <RightNav
          rotateToggle={() => setRotating(!isRotating)}
          allCellsLoaded={allCellsLoaded}
          currentTheme={currentTheme}
          changeTheme={changeTheme}
        />
      </div>
    </div>
  );
}
