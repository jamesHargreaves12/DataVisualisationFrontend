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
