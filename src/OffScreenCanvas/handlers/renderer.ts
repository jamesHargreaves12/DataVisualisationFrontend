import { getDebouncedPrint, INITIAL_RENDERING_SETTINGS } from "../../util";
import {
  getAveragePosition,
  getNextCameraSettings,
  getXYAngleBetween,
} from "./helpers/rotationHelpers";
import * as THREE from "three";
import { OffscreenEventArgs } from "../EventTypes";

export type SceneElement = {
  canvasWidth: number;
  canvasHeight: number;
  ctx: OffscreenCanvasRenderingContext2D;
  scene: THREE.Scene;
  camera: THREE.Camera;
};

const sceneElements: Record<string, SceneElement> = {};
const prevRenderTime: Record<string, number> = {};
// These values will be almost immediately overwritten but since both here and RightNav read from the same defaults it won't result in a rerender
const renderSettings = {
  shouldRotate: false,
  rotationSpeed: INITIAL_RENDERING_SETTINGS.ROTATION_SPEED,
  zAxisAngle: INITIAL_RENDERING_SETTINGS.Z_AXIS_ANGLE,
  cameraRadius: INITIAL_RENDERING_SETTINGS.CAMERA_RADIUS,
};

export const getRenderSettings = () => ({ ...renderSettings });

export const setupRenderer = ({
  canvas,
}: OffscreenEventArgs["setupRenderer"]) => {
  const renderer = new THREE.WebGLRenderer({ canvas });
  const debouncedPrint = getDebouncedPrint(500);

  function renderFunction(time: number) {
    const averageCameraPosition = getAveragePosition(
      Object.values(sceneElements).map((x) => x.camera.position)
    );
    for (const key in sceneElements) {
      const { canvasHeight, canvasWidth, ctx, camera, scene } = sceneElements[
        key
      ];
      let deltaTimeAngle = prevRenderTime[key]
        ? (time - prevRenderTime[key]) / 1000
        : 0;

      prevRenderTime[key] = time;
      const nextZ =
        renderSettings.cameraRadius *
        Math.sin((Math.PI * renderSettings.zAxisAngle) / 180);
      camera.position.z = nextZ; // We do this as the z coord is used to calculate the next x,y coord
      let deltaAveragePositionAngle = getXYAngleBetween(
        averageCameraPosition,
        camera.position
      );
      if (!renderSettings.shouldRotate) {
        deltaTimeAngle = 0;
        deltaAveragePositionAngle = 0;
      }
      const { x, y, upX, upY } = getNextCameraSettings(
        camera.position,
        (deltaTimeAngle - deltaAveragePositionAngle / 10) *
          renderSettings.rotationSpeed,
        renderSettings.cameraRadius
      );
      camera.position.set(x, y, nextZ);
      camera.up.set(upX, upY, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // controls.update();
      renderer.render(scene, camera);
      // debouncedPrint(x, y, upX, upY, camera.position.z);

      // const rect = canvasElement.getBoundingClientRect();
      // const width = Math.round(rect.width);
      // const height = Math.round(rect.height);
      const rendererCanvas = renderer.domElement;

      if (
        rendererCanvas.width !== canvasWidth ||
        rendererCanvas.height !== canvasHeight
      ) {
        renderer.setSize(canvasWidth, canvasHeight, false);
      }

      // make sure the canvas for this area is the same size as the area
      if (
        ctx.canvas.width !== canvasWidth ||
        ctx.canvas.height !== canvasHeight
      ) {
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;
      }

      // copy the rendered scene to this element's canvas
      ctx.globalCompositeOperation = "copy";
      ctx.drawImage(
        rendererCanvas,
        0,
        0,
        canvasWidth,
        canvasHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
      );
    }
    // Just to slow things down a little to conserve resources
    setTimeout(() => requestAnimationFrame(renderFunction), 50);
  }
  requestAnimationFrame(renderFunction);
};

export const registerSceneForRendering = (id: string, se: SceneElement) => {
  sceneElements[id] = se;
};

export const getSceneIfExists = (id: string) => {
  return sceneElements[id];
};

export const removeSceneFromRendering = (id: string) => {
  delete sceneElements[id];
  delete prevRenderTime[id];
};

export const refreshScene = (id: string, sceneElement: SceneElement) => {
  removeSceneFromRendering(id);
  registerSceneForRendering(id, sceneElement);
};

export const getScenesAndIds = () => {
  return Object.entries(sceneElements);
};

export const setRotating = ({ rotate }: OffscreenEventArgs["setRotating"]) => {
  renderSettings.shouldRotate = rotate;
};

export const setRotateSpeed = ({
  speed,
}: OffscreenEventArgs["setRotateSpeed"]) => {
  renderSettings.rotationSpeed = speed;
};

export const setZAxisAngle = ({
  angle,
}: OffscreenEventArgs["setZAxisAngle"]) => {
  renderSettings.zAxisAngle = angle;
};
export const setCameraRadius = ({
  radius,
}: OffscreenEventArgs["setCameraRadius"]) => {
  console.log(radius);
  renderSettings.cameraRadius = radius;
};
