import {
  setRotating,
  setupRenderer,
  setRotateSpeed,
  setZAxisAngle,
  setCameraRadius,
} from "./handlers/renderer";
import { addNewScene } from "./handlers/addNewScene";
import { removeAllScenes, removeScene } from "./handlers/removeScenes";
import {
  OffscreenEventHandlers,
  MessageToWorker,
  MessageFromWorker,
} from "./EventTypes";
import { changeMaterial } from "./handlers/changeMaterial";
import { changeColourPower } from "./handlers/changeColourPower";
import { setHeightCap } from "./handlers/changeHeightCap";
// well this is grim... but it is a known issue with ts
//https://github.com/microsoft/TypeScript/issues/14877
declare var self: DedicatedWorkerGlobalScope;
const handlers: OffscreenEventHandlers = {
  setupRenderer,
  addNewScene,
  removeAllScenes,
  removeScene,
  setRotating,
  changeMaterial,
  setRotateSpeed,
  setZAxisAngle,
  setCameraRadius,
  changeColourPower,
  setHeightCap,
};

self.onmessage = async function ({ data }: { data: MessageToWorker }) {
  // @ts-ignore This does type but because data.type is considered a union
  handlers[data.type](data);
};

export const sendBackMessage = (data: MessageFromWorker) => {
  self.postMessage(data);
};

export default self;
