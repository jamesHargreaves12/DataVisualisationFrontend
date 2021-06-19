import { createContext, memo, useEffect, useMemo, useState } from "react";
import { MATERIAL_FILEPATHS } from "../FileLoader";
import {
  sendChangeMaterial,
  sendSetColourPower,
  sendSetRotate,
  workerNotifications,
} from "../OffscreenCanvasMiddleware";
import { debounced } from "../util";
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
  currentColourPower: number;
  setCurrentColourPower: (power: number) => void;
}>({
  currentTheme: MATERIAL_FILEPATHS[0],
  setTheme: () => {},
  canvasStatuses: {},
  reportCanvasStatusChange: () => {},
  isRotating: false,
  setRotating: () => {},
  currentColourPower: 1,
  setCurrentColourPower: () => {},
});

export function RenderingContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { Provider } = renderingSettingsContext;
  const [currentTheme, setTheme] = useState(MATERIAL_FILEPATHS[0]);
  const [currentColourPower, setCurrentColourPower] = useState(1);
  const [canvasStatuses, setCanvasStatuses] = useState<{
    [k: string]: CanvasStatus;
  }>({});
  const [isRotating, setIsRotating] = useState(false);
  const setRotating = (val: boolean) => {
    sendSetRotate(val);
    setIsRotating(val);
  };
  const reportCanvasStatusChange = (canvasId: string, status: CanvasStatus) => {
    setCanvasStatuses({ ...canvasStatuses, [canvasId]: status });
  };
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

  const debouncedSendCurrentColourPower = useMemo(
    () => debounced((x: number) => sendSetColourPower(x)),
    [sendSetColourPower]
  );
  useEffect(() => {
    debouncedSendCurrentColourPower(currentColourPower);
  }, [currentColourPower, debouncedSendCurrentColourPower]);

  return (
    <Provider
      value={{
        currentTheme,
        setTheme,
        canvasStatuses,
        reportCanvasStatusChange,
        isRotating,
        setRotating,
        setCurrentColourPower,
        currentColourPower,
      }}
    >
      {children}
    </Provider>
  );
}

export default renderingSettingsContext;
