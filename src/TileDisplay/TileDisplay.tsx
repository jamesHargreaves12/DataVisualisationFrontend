import React from "react";
import PagingBar from "../PagingBar";

type TileDisplayProps<T> = {
  groupedTileDetails: T[][];
  renderTile: (cellNumber: number, tileDetails: T) => JSX.Element;
  currentPage: number;
  numberOfPages: number;
  setPage: (pageNumber: number) => void;
};
export default function TileDisplay<T>({
  groupedTileDetails,
  renderTile,
  currentPage,
  numberOfPages,
  setPage,
}: TileDisplayProps<T>) {
  const cellsPerRow = groupedTileDetails[0].length;
  return (
    <>
      {groupedTileDetails.map((group, indexGroup) => (
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "row",
          }}
          key={indexGroup}
        >
          {group.map((tileDetails, index) => {
            const cellNumber = indexGroup * cellsPerRow + index;
            return renderTile(cellNumber, tileDetails);
          })}
        </div>
      ))}
      <PagingBar
        setPage={setPage}
        currentPage={currentPage}
        totalPages={numberOfPages}
      />
    </>
  );
}
