import * as THREE from "three";
import { Group, Mesh } from "three";
import {
  getSceneIfExists,
  getScenesAndIds,
  removeSceneFromRendering,
} from "./renderer";
import { OffscreenEventArgs } from "../EventTypes";
import {
  cancelledLoadingFilepaths,
  currentlyLoadingFilepaths,
} from "./addNewScene";

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

export const removeAllScenes = () => {
  const scenes = getScenesAndIds();
  scenes.forEach(([id, { scene, ctx, canvasHeight, canvasWidth }]) => {
    if (scene) cleanUpScene(scene);
    // Color them grey - clears the current value
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    removeSceneFromRendering(id);
  });
};

export const removeScene = ({
  id,
  objFilepath,
}: OffscreenEventArgs["removeScene"]) => {
  if (currentlyLoadingFilepaths.has(objFilepath))
    cancelledLoadingFilepaths.add(objFilepath);

  const sceneInfo = getSceneIfExists(id);
  if (sceneInfo?.scene) {
    const { scene, ctx, canvasHeight, canvasWidth } = getSceneIfExists(id);
    cleanUpScene(scene);
    // Color them grey - clears the current value
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    removeSceneFromRendering(id);
  }
};
