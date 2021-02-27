import { useState } from "react";

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
