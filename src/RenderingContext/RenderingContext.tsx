import { createContext, useEffect, useMemo, useRef, useState } from "react";
import {
  sendChangeMaterial,
  sendSetColourPower,
  sendSetRotate,
  workerNotifications,
} from "../OffscreenCanvasMiddleware";
import { debounced } from "../util";
import { MATERIAL_FILEPATHS } from "../FileLoader/Materials";
export enum CanvasStatus {
  Unloaded,
  Loaded,
  Removed,
}

const renderingSettingsContext = createContext<{
  currentTheme: string;
  setTheme: (theme: string) => void;
  canvasStatuses: { [k: string]: CanvasStatus };
  reportCanvasStatusChange: (canvasId: string, status: CanvasStatus) => void;
  isRotating: boolean;
  setRotating: (rotating: boolean) => void;
}>({
  currentTheme: MATERIAL_FILEPATHS[0],
  setTheme: () => {},
  canvasStatuses: {},
  reportCanvasStatusChange: () => {},
  isRotating: false,
  setRotating: () => {},
});

type CanvasStatusState = {
  [k: string]: CanvasStatus;
};
const useCanvasStatuses = () => {
  // This is kinda ugly but I think necessary since:
  // 1) We need state that we can inspect the current version of rather than the version
  // on the last rerender due to the fact that multiple canvas status can change status between renders.
  // 2) We need to trigger a rerender when the state updates to ensure that down stream consumers of the state can use it.

  const [
    canvasStatusLastUpdated,
    setCanvasStatusLastUpdated,
  ] = useState<number>();
  const canvasStatusesRef = useRef<CanvasStatusState>({});
  const reportCanvasStatusChange = (canvasId: string, status: CanvasStatus) => {
    canvasStatusesRef.current[canvasId] = status;
    setCanvasStatusLastUpdated(Date.now());
  };
  return {
    canvasStatuses: canvasStatusesRef.current,
    reportCanvasStatusChange,
  };
};

export function RenderingContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { Provider } = renderingSettingsContext;
  const [currentTheme, setTheme] = useState(MATERIAL_FILEPATHS[0]);
  const [isRotating, setIsRotating] = useState(false);
  const setRotating = (val: boolean) => {
    sendSetRotate(val);
    setIsRotating(val);
  };
  const { canvasStatuses, reportCanvasStatusChange } = useCanvasStatuses();
  useEffect(() => {
    const subscriptionId = "useCellStatus";
    workerNotifications.subscribe(
      "canvasRendered",
      subscriptionId,
      ({ canvasId }: { canvasId: string }) => {
        console.log("Loaded", canvasId);
        if (canvasStatuses[canvasId] != CanvasStatus.Removed)
          reportCanvasStatusChange(canvasId, CanvasStatus.Loaded);
      }
    );
    return () =>
      workerNotifications.unsubscribe("canvasRendered", subscriptionId);
  }, [canvasStatuses]);
  useEffect(() => {
    sendChangeMaterial(currentTheme);
  }, [currentTheme]);

  return (
    <Provider
      value={{
        currentTheme,
        setTheme,
        canvasStatuses,
        reportCanvasStatusChange,
        isRotating,
        setRotating,
      }}
    >
      {children}
    </Provider>
  );
}

export default renderingSettingsContext;
