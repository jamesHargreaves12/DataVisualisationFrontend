import React, { useCallback, useEffect, useRef, useState } from "react";
import ObjectRenderingCell from "../ObjectRenderingCell";
import {
  filenameToDetails,
  Gender,
  getFilteredFiles,
  OBJ_FILENAMES,
} from "../ObjFileLoad";
import { batchArray, getDebouncedPrint } from "../util";
import Button from "@material-ui/core/Button";
import "./ObjectRenderingPagedComponent.scss";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import MaterialCreator = MTLLoader.MaterialCreator;
import { useRendering } from "./renderHelper";
import { CellStatus } from "../ObjectRenderingCell/ObjectRenderingCellComponent";
import FilterBar from "../FiltersBar/FilterBar";
import PagingBar from "../PagingBar";

const useMaterial = (materialPath: string) => {
  const [materialCreator, setMaterialCreator] = useState<MaterialCreator>();
  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setMaterialOptions({ side: THREE.DoubleSide });
    mtlLoader.load(materialPath, (mtl) => {
      mtl.preload();
      setMaterialCreator(mtl);
    });
  }, [materialPath]);
  return materialCreator;
};

const useCellStatus = () => {
  const [cellStatusTracker, setCellStatusTracker] = useState<
    Record<number, CellStatus>
  >({});
  const loadedCount = Object.values(cellStatusTracker).filter(
    (x) => x === CellStatus.Loaded
  ).length;
  const updateCellStatus = (cellNumber: number, value: CellStatus) =>
    setCellStatusTracker((current) => ({ ...current, [cellNumber]: value }));
  return { loadedCount, updateCellStatus, cellStatusTracker };
};

const PAGE_CONFIG = {
  widthCell: 350,
  heightCell: 350,
  pageSize: 8,
  rowSize: 4,
  materialPath: "src/data/master.mtl",
};

export default function ObjectRenderingGroup() {
  const {
    widthCell,
    heightCell,
    pageSize,
    rowSize,
    materialPath,
  } = PAGE_CONFIG;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);

  const { loadedCount, updateCellStatus, cellStatusTracker } = useCellStatus();
  const unfilteredFileDetails = OBJ_FILENAMES.map((f) => filenameToDetails(f));
  const filteredFiles = getFilteredFiles(
    unfilteredFileDetails,
    searchStatus,
    selectedGenders,
    selectedAgeRanges
  );
  filteredFiles.sort((a, b) => a.title.localeCompare(b.title));
  const pagedFiles = batchArray(filteredFiles, pageSize);
  const currentPageFiles = pagedFiles[currentPage];
  const groupedFileNames = batchArray(currentPageFiles, 4);
  const debouncedPrint = getDebouncedPrint();
  const {
    addScene,
    removeScene,
    renderer,
    removeAllScenes,
    toggleShouldRotate,
    stopRotationIfOccuring,
  } = useRendering(widthCell, heightCell);
  const material = useMaterial(materialPath);

  return (
    <div className="object-rendering-group">
      <FilterBar
        selectedGenders={selectedGenders}
        setSearchStatus={setSearchStatus}
        setSelectedGenders={setSelectedGenders}
        selectedAgeRanges={selectedAgeRanges}
        setSelectedAgeRanges={setSelectedAgeRanges}
        unfilteredFileDetails={unfilteredFileDetails}
      />
      {groupedFileNames.map((group, indexGroup) => (
        <div className="object-rendering-group__row" key={indexGroup}>
          {group.map((fileDetails, index) => {
            const cellNumber = indexGroup * rowSize + index;
            return (
              material && (
                <ObjectRenderingCell
                  canvasHeight={heightCell}
                  canvasWidth={widthCell}
                  cellNumber={cellNumber}
                  objFileDetails={fileDetails}
                  key={cellNumber}
                  addScene={addScene}
                  renderer={renderer}
                  material={material}
                  removeScene={removeScene}
                  // shouldRotate={shouldRotate}
                  cellStatus={cellStatusTracker[cellNumber]}
                  reportCellStatusChange={(x) =>
                    updateCellStatus(cellNumber, x)
                  }
                />
              )
            );
          })}
        </div>
      ))}

      <PagingBar
        setPage={(page: number) => {
          stopRotationIfOccuring();
          removeAllScenes();
          setCurrentPage(page);
        }}
        onRotate={toggleShouldRotate}
        allLoaded={loadedCount === currentPageFiles.length}
        currentPage={currentPage}
        // totalPages={pagedFiles.length}
        totalPages={9}
      />
    </div>
  );
}
