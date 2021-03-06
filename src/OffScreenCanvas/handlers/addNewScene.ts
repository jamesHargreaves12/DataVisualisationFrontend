import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { getMaterialCreator } from "./helpers/materialLoader";
import { getNextCameraSettings } from "./helpers/rotationHelpers";
import { Vector3 } from "three";
import { getRenderSettings, registerSceneForRendering } from "./renderer";
import { OffscreenEventArgs } from "../EventTypes";
import { sendBackMessage } from "../OffScreenCanvas.worker";
import { CompressedObjLoader } from "./helpers/CompressedObjLoader";
import { isLocalDev } from "../../util";

export const cancelledLoadingFilepaths = new Set();
export const currentlyLoadingFilepaths = new Set();

export const addNewScene = async ({
  id,
  canvas,
  objFilepath,
  canvasHeight,
  canvasWidth,
  materialImageLocation,
}: OffscreenEventArgs["addNewScene"]) => {
  // TODO send these over
  const { cameraRadius, zAxisAngle } = getRenderSettings();
  const fov = 35;
  const intensityAmb = 1;
  const initialDegreesXY = 35;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fov,
    canvasWidth / canvasHeight,
    0.1,
    1000
  );
  scene.background = new THREE.Color(0x938e94);
  const ambientLight = new THREE.AmbientLight(0x404040, intensityAmb); // soft white light
  scene.add(ambientLight);
  // Setup HemisphereLight light
  const skyColor = 0xb1e1ff; // light blue
  const groundColor = 0xb97a20; // brownish orange
  const intensityHemi = 0.2;
  const lightHemi = new THREE.HemisphereLight(
    skyColor,
    groundColor,
    intensityHemi
  );
  scene.add(lightHemi);

  const objLoader = isLocalDev ? new OBJLoader() : new CompressedObjLoader();
  const materialCreator = await getMaterialCreator(materialImageLocation);
  objLoader.setMaterials(materialCreator as any);
  currentlyLoadingFilepaths.add(objFilepath);
  cancelledLoadingFilepaths.delete(objFilepath);
  objLoader.load(objFilepath, (root) => {
    currentlyLoadingFilepaths.delete(objFilepath);
    if (cancelledLoadingFilepaths.has(objFilepath)) return;
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxCenter = box.getCenter(new THREE.Vector3());
    const newOrigin = [boxCenter.x, boxCenter.y, 0];
    // reset the object so that it is centered at the origin
    root.position.set(-newOrigin[0], -newOrigin[1], -newOrigin[2]);
    const zPos = cameraRadius * Math.sin((Math.PI * zAxisAngle) / 180);

    const { x, y, upX, upY } = getNextCameraSettings(
      new Vector3(
        -cameraRadius * Math.sin((Math.PI * initialDegreesXY) / 180),
        0.01,
        zPos
      ),
      0,
      cameraRadius
    );
    camera.position.set(x, y, zPos);
    camera.up.set(upX, upY, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    registerSceneForRendering(id, {
      camera,
      ctx,
      scene,
      canvasWidth,
      canvasHeight,
    });

    sendBackMessage({ type: "canvasRendered", canvasId: id });
  });
};
