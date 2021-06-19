import {
  MessageFromWorker,
  MessageToWorker,
  NotifyOnScreenData,
} from "../OffScreenCanvas/EventTypes";
import { TopicSubscriptionManager } from "./TopicSubscriptionManager";
import { getUrl } from "../FileLoader";

// This is currently very brittle. you should take alot of care before changing the following line. The name of the worker has to match the path in webpack.config.js
// This should almost certainly be improved at some point
const worker = new Worker(getUrl("/offscreen.js"));
function sendMessage(data: MessageToWorker, transfer: Transferable[] = []) {
  worker.postMessage(data, transfer);
}

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.width = `100px`;
canvas.style.height = `100px`;
canvas.style.visibility = "hidden";
canvas.style.display = "none";
const offscreen = canvas.transferControlToOffscreen();

sendMessage(
  {
    type: "setupRenderer",
    canvas: offscreen,
  },
  [offscreen]
);

export function sendAddNewScene(
  canvasElement: HTMLCanvasElement,
  objFilepath: string,
  canvasWidth: number,
  canvasHeight: number,
  materialImageLocation: string
) {
  const offscreen = canvasElement.transferControlToOffscreen();
  sendMessage(
    {
      type: "addNewScene",
      objFilepath,
      canvas: offscreen,
      id: canvasElement.id,
      canvasWidth,
      canvasHeight,
      materialImageLocation,
    },
    [offscreen]
  );
}

export function sendSetRotate(rotate: boolean) {
  sendMessage({
    type: "setRotating",
    rotate,
  });
}
export function sendSetRotateSpeed(speed: number) {
  sendMessage({
    type: "setRotateSpeed",
    speed,
  });
}
export function sendSetZAxis(angle: number) {
  sendMessage({
    type: "setZAxisAngle",
    angle,
  });
}
export function sendSetColourPower(power: number) {
  sendMessage({
    type: "changeColourPower",
    power,
  });
}

export function sendSetCameraRadius(radius: number) {
  sendMessage({
    type: "setCameraRadius",
    radius,
  });
}

export function sendRemoveAllScenes() {
  sendMessage({
    type: "removeAllScenes",
  });
}

export function sendRemoveScene(id: string, objFilepath: string) {
  sendMessage({
    type: "removeScene",
    id,
    objFilepath,
  });
}

export function sendChangeMaterial(materialLocation: string) {
  sendMessage({
    type: "changeMaterial",
    materialLocation,
  });
}

export const workerNotifications = new TopicSubscriptionManager<NotifyOnScreenData>();
worker.onmessage = function ({ data }: { data: MessageFromWorker }) {
  workerNotifications.pushMessage(data["type"], data);
};
