import { Group, Mesh, Vector3 } from "three";
import * as THREE from "three";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getDebouncedPrint, XOR } from "../util";

export type SceneElement = {
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scene: THREE.Scene;
  renderFn: (cameraSettings: CameraSettings) => void;
  camera: THREE.Camera;
};

// This is a pain that we have to just have these variables not scoped to the function :(
// I cannot find a good way to do this though.
// At least they are scoped to this file.
const sceneElements: Record<string, SceneElement> = {};
const prevRenderTime: Record<string, number> = {};
const wrappedShouldRotate = { shouldRotate: false };

const getWebGlRenderer = (widthCell: number, heightCell: number) => {
  const canvas = document.createElement("canvas");
  // const offscreen = canvas.transferControlToOffscreen();
  // const workeer = new Worker("offscreencanvas-c");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  const debouncedPrint = getDebouncedPrint(500);
  function renderFunction(time: number) {
    const averageCameraPosition = getAveragePosition(
      Object.values(sceneElements).map((x) => x.camera.position)
    );
    for (const key in sceneElements) {
      const { canvasElement, renderFn, ctx, camera } = sceneElements[key];
      let deltaTimeAngle = prevRenderTime[key]
        ? (time - prevRenderTime[key]) / 1000
        : 0;
      prevRenderTime[key] = time;
      let deltaAveragePositionAngle = getXYAngleBetween(
        averageCameraPosition,
        camera.position
      );
      if (!wrappedShouldRotate.shouldRotate) {
        deltaTimeAngle = 0;
        deltaAveragePositionAngle = 0;
      }
      const newCameraSettings = getNextCameraSettings(
        camera.position,
        deltaTimeAngle - deltaAveragePositionAngle / 10
      );

      renderFn(newCameraSettings);

      const rect = canvasElement.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      const rendererCanvas = renderer.domElement;

      if (rendererCanvas.width < width || rendererCanvas.height < height) {
        renderer.setSize(width + 1, height + 1, true);
      }

      // make sure the canvas for this area is the same size as the area
      if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
        ctx.canvas.width = width;
        ctx.canvas.height = height;
      }

      // copy the rendered scene to this element's canvas
      ctx.globalCompositeOperation = "copy";
      ctx.drawImage(rendererCanvas, 0, 0, width, height, 0, 0, width, 400);
    }
    requestAnimationFrame(renderFunction);
  }

  requestAnimationFrame(renderFunction);

  renderer.setSize(widthCell, heightCell);
  return renderer;
};

export const useRendering = (widthCell: number, heightCell: number) => {
  const renderer = useMemo(() => getWebGlRenderer(widthCell, heightCell), [
    widthCell,
    heightCell,
  ]);

  const toggleShouldRotate = () => {
    wrappedShouldRotate.shouldRotate = !wrappedShouldRotate.shouldRotate;
  };
  const stopRotationIfOccuring = () => {
    wrappedShouldRotate.shouldRotate = false;
  };

  function addScene(sceneElement: Omit<SceneElement, "ctx">) {
    const ctx = sceneElement.canvasElement.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    sceneElements[sceneElement.canvasElement.id] = { ...sceneElement, ctx };
  }
  function removeScene(id: string) {
    if (id in sceneElements) {
      const { scene, canvasElement } = sceneElements[id];
      if (scene) cleanUpScene(scene);
      // Color them grey - clears the current value
      const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, widthCell, heightCell);

      delete sceneElements[id];
      delete prevRenderTime[id];
    }
  }

  function removeAllScenes() {
    for (const id in sceneElements) {
      removeScene(id);
    }
  }

  return {
    renderer,
    addScene,
    removeScene,
    removeAllScenes,
    toggleShouldRotate,
    stopRotationIfOccuring,
  };
};

/// CLEANUP
const cleanUpScene = (scene: THREE.Scene) => {
  scene.children.forEach((child) => {
    if (child instanceof Group) {
      cleanUpGroup(child);
      scene.remove(child);
    }
    // TODO more here
  });
};

const cleanUpGroup = (group: THREE.Group) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      cleanUpMesh(child);
    }
  });
};

const cleanUpMesh = (mesh: THREE.Mesh) => {
  safeDispose(mesh.geometry);
};

const safeDispose = (val?: { dispose?: () => void }) => {
  if (val && val.dispose) {
    val.dispose();
  }
};

// TODO find a beter home for these:

export type CameraSettings = { x: number; y: number; upX: number; upY: number };

const getXYPlanePolarCoords = ({ x, y }: Vector3) => {
  const radiusXYPlane = Math.sqrt(x ** 2 + y ** 2);
  const angleXYPlane = Math.atan2(y, x); // Radians
  return { radiusXYPlane, angleXYPlane };
};

const getXYAngleBetween = (p1: Vector3, p2: Vector3) => {
  // TODO divide by 0
  const angleXYPlane1 = Math.atan2(p1.y, p1.x);
  const angleXYPlane2 = Math.atan2(p2.y, p2.x);
  return angleXYPlane2 - angleXYPlane1;
};
export const getNextCameraSettings = (
  point: Vector3,
  deltaTheta: number = 0
): CameraSettings => {
  const { radiusXYPlane, angleXYPlane } = getXYPlanePolarCoords(point);
  const newAngleXY = angleXYPlane + deltaTheta;
  // const signFlip = XOR(point.x > 0, deltaTheta >= 0) ? 1 : -1;
  return {
    x: radiusXYPlane * Math.cos(newAngleXY),
    y: radiusXYPlane * Math.sin(newAngleXY),
    upX: -Math.cos(newAngleXY),
    upY: -Math.sin(newAngleXY),
  };
};

const getAveragePosition = (points: Vector3[]) => {
  const acc = new Vector3(0, 0, 0);
  points.forEach((point) => {
    acc.x += point.x;
    acc.y += point.y;
    acc.z += point.z;
  });
  return acc;
};
