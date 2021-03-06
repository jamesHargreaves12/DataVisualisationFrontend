export type OffscreenEventArgs = {
  setupRenderer: { canvas: OffscreenCanvas };
  addNewScene: {
    id: string;
    canvas: OffscreenCanvas;
    objFilepath: string;
    canvasWidth: number;
    canvasHeight: number;
    materialImageLocation: string;
  };
  removeAllScenes: {};
  removeScene: { id: string; objFilepath: string };
  setRotating: { rotate: boolean };
  changeMaterial: { materialLocation: string };
  setRotateSpeed: { speed: number };
  setZAxisAngle: { angle: number };
  setCameraRadius: { radius: number };
  changeColourPower: { power: number };
};

// TODO I'm think this adding significant latency the first load time - I think this is fixed.
// Will leave comment for now but in the future I will remove it if I haven't seen the problem resurface
export type ValueOf<T> = T[keyof T];
export type MessageToWorker = ValueOf<
  {
    [NameHandler in keyof OffscreenEventArgs]: {
      type: NameHandler;
    } & OffscreenEventArgs[NameHandler];
  }
>;

export type OffscreenEventHandlers = {
  [k in keyof OffscreenEventArgs]: (data: OffscreenEventArgs[k]) => void;
};

export type NotifyOnScreenData = {
  canvasRendered: { canvasId: string };
};
export type MessageFromWorker = ValueOf<
  {
    [NameHandler in keyof NotifyOnScreenData]: {
      type: NameHandler;
    } & NotifyOnScreenData[NameHandler];
  }
>;
