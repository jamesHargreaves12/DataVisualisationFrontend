import React from "react";
import PagingBar from "../PagingBar";

export type TileComponent<T> = React.FC<{cellNumber: number, tileDetails: T}>;

// Making it have an id subtype enables us to use the id as a key
type TileDisplayProps<T extends {id:string}> = {
  groupedTileDetails: T[][];
  TileComponent: TileComponent<T>;
  currentPage: number;
  numberOfPages: number;
  setPage: (pageNumber: number) => void;
};
export default function TileDisplay<T extends {id:string}>({
  groupedTileDetails,
  TileComponent,
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
            return <TileComponent key={tileDetails.id} cellNumber={cellNumber} tileDetails={tileDetails}/>;
            
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
