import Button from "@material-ui/core/Button";
import React from "react";
import "./PagingBar.scss";

type PaginationButtonProps = {
  pageIndex: number;
  isCurrentPage: boolean;
  setPage: (page: number) => void;
};
function PaginationButton({
  pageIndex,
  isCurrentPage,
  setPage,
}: PaginationButtonProps) {
  return isCurrentPage ? (
    <Button className={"paging-bar__current-page-button"}>
      {pageIndex + 1}
    </Button>
  ) : (
    <Button
      className={"paging-bar__other-page-button"}
      onClick={() => setPage(pageIndex)}
    >
      {pageIndex + 1}
    </Button>
  );
}

const getPagingIndicator = (
  totalPages: number,
  currentPage: number,
  setPage: (page: number) => void
) => {
  const filler = <div className="paging-bar__filler">...</div>;
  const getButton = (pageIndex: number) => (
    <PaginationButton
      pageIndex={pageIndex}
      isCurrentPage={pageIndex === currentPage}
      setPage={setPage}
    />
  );

  if (totalPages <= 5)
    return Array.from(new Array(totalPages), (v, i) => getButton(i));
  if ([0, 1, 2].includes(currentPage)) {
    return [0, 1, 2, 3]
      .map((i) => getButton(i))
      .concat([filler, getButton(totalPages - 1)]);
  }
  if ([totalPages - 1, totalPages - 2, totalPages - 3].includes(currentPage))
    return [getButton(1), filler].concat(
      [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ].map((i) => getButton(i))
    );
  return [getButton(0), filler]
    .concat(
      [currentPage - 1, currentPage, currentPage + 1].map((i) => getButton(i))
    )
    .concat([filler, getButton(totalPages - 1)]);
};

type PagingBarProps = {
  setPage: (page: number) => void;
  onRotate: () => void;
  totalPages: number;
  currentPage: number;
  allLoaded: boolean;
};

export default function PagingBar({
  setPage,
  onRotate,
  totalPages,
  currentPage,
  allLoaded,
}: PagingBarProps) {
  return (
    <div className={"paging-bar"}>
      <Button onClick={onRotate} disabled={!allLoaded} variant="contained">
        Rotate
      </Button>
      <div style={{ float: "right" }}>
        <Button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage == 0}
          // TODO classname
          className={"paging-bar"}
          variant="contained"
        >
          Prev
        </Button>
        {getPagingIndicator(totalPages, currentPage, setPage)}
        <Button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage == totalPages - 1}
          className={"paging-bar__pagination-button"}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
