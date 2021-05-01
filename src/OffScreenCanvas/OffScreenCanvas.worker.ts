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
};

self.onmessage = function ({ data }: { data: MessageToWorker }) {
  // @ts-ignore This does type I am not sure why ts doesn't recognise it TODO
  handlers[data.type](data);
};

export default self;

export const sendBackMessage = (data: MessageFromWorker) => {
  console.log(self);
  self.postMessage(data);
};
