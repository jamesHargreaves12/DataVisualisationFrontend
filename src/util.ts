import { useEffect, useState } from "react";

export const batchArray = <T>(arr: T[], groupSize: number, fillValue?: T) => {
  const batched = arr
    .reduce<T[][]>(
      (prev: T[][], current: T) => {
        const [startPrev, ...restPrev] = prev;
        if (startPrev.length == groupSize) {
          return [[current], ...prev];
        }
        return [[...startPrev, current], ...restPrev];
      },
      [[]]
    )
    .reverse();

  if (fillValue !== undefined)
    //  only the final group can be unfilled.
    batched[-1] = batched[-1].concat([
      ...Array(groupSize - batched[-1].length).map(() => fillValue),
    ]);

  return batched;
};

export const getCurrentPageDetails = <T>(
  details: T[],
  pageSize: number,
  cellsPerRow: number
) => {
  const pagedDetails = batchArray(details, pageSize);
  const getGroupsForPage = (currentPage: number) => {
    const groupedFileNames = batchArray(pagedDetails[currentPage], cellsPerRow);
    return groupedFileNames;
  };
  return {
    getGroupsForPage,
    numberOfPages: pagedDetails.length,
  };
};

let timeout: any;
export const debounced = (
  fn: (...args: any[]) => void,
  delay: number = 200
) => {
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay, ...args);
  };
};

let inTimeout = false;
export const getDebouncedPrint = (timeout = 200) => {
  return (...args: any[]) => {
    if (inTimeout) return;
    inTimeout = true;
    console.log(...args);
    setTimeout(() => {
      inTimeout = false;
    }, timeout);
  };
};

export const XOR = (a: boolean, b: boolean) => (a || b) && !(a && b);

export const PAGE_LAYOUT_CONFIG = {
  widthCell: 350,
  heightCell: 350,
  cellMarginSize: 8,
  cellPaddingSize: 8,
  rightNavWidth: 300,
  topNavBarHeight: 60,
  filterBarHeight: 60,
  pagingBarHeight: 60,
  cellTitleHeight: 25,
};

export const INITIAL_RENDERING_SETTINGS = {
  HEIGHT_CAP_PERCENT: 100,
  ROTATION_SPEED: 1,
  Z_AXIS_ANGLE: 55,
  CAMERA_RADIUS: 40,
  FIELD_OF_VIEW_DEGREES: 35,
  INTENSITY_AMBIENT_LIGHT: 1,
  INITIAL_DEGREES_XY_PLANE: -10,
  CAMERA_NEAR_CUT_OFF: 0.1,
  CAMERA_FAR_CUT_OFF: 1000
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const useContentLayout = (withRightNav: boolean) => {
  const windowSize = useWindowSize();
  if (!windowSize.width || !windowSize.height) {
    // IS 0 the correct value here rather some value indicating an explicit no size? Will leave as is for now
    return {
      contentAreaWidth: 0,
      contentAreaHeight: 0,
    };
  }

  const { rightNavWidth, topNavBarHeight } = PAGE_LAYOUT_CONFIG;
  const contentAreaWidth =
    windowSize.width - (withRightNav ? rightNavWidth : 0);
  const contentAreaHeight = windowSize.height - topNavBarHeight;
  return {
    contentAreaWidth,
    contentAreaHeight,
  };
};

export const useCardCellLayout = (withRightNav = true) => {
  const {
    widthCell,
    heightCell,
    cellMarginSize,
    cellPaddingSize,
    filterBarHeight,
    pagingBarHeight,
    cellTitleHeight,
  } = PAGE_LAYOUT_CONFIG;
  const { contentAreaWidth, contentAreaHeight } = useContentLayout(
    withRightNav
  );
  const totalCellWidth = 2 * cellMarginSize + 2 * cellPaddingSize + widthCell;
  const cellsPerRow = Math.floor(contentAreaWidth / totalCellWidth);
  const horizontalPadding = (contentAreaWidth % totalCellWidth) / 2;

  const totalCellHeight =
    2 * cellMarginSize + 2 * cellPaddingSize + heightCell + cellTitleHeight;
  const totalContentHeight =
    contentAreaHeight - filterBarHeight - pagingBarHeight;
  const rowCount = Math.floor(totalContentHeight / totalCellHeight);
  const verticalPadding = (totalContentHeight % totalCellHeight) / 2;
  return {
    cellsPerRow,
    horizontalPadding,
    rowCount,
    verticalPadding,
  };
};

export const isLocalDev = self.location.hostname === "localhost";
