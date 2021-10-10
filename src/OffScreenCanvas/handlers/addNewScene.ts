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
import { applyHeightCap, heightCapState } from "./changeHeightCap";
import { setColourFromHeight } from "./helpers/TextureCoords";

export const cancelledLoadingFilepaths = { current: new Set() };
export const currentlyLoadingFilepaths = { current: new Set() };

export const addNewScene = async ({
  id,
  canvas,
  objFilepath,
  canvasHeight,
  canvasWidth,
  materialImageLocation,
}: OffscreenEventArgs["addNewScene"]) => {
  // TODO send these over
  const { zAxisAngle } = getRenderSettings();
  const fov = 35;
  const intensityAmb = 1;
  const initialDegreesXY = -10;

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
  currentlyLoadingFilepaths.current.add(objFilepath);
  cancelledLoadingFilepaths.current.delete(objFilepath);
  objLoader.load(objFilepath, (root) => {
    currentlyLoadingFilepaths.current.delete(objFilepath);
    if (cancelledLoadingFilepaths.current.has(objFilepath)) return;

    if (heightCapState.capPercent < 100) {
      applyHeightCap(root);
    }
    setColourFromHeight(root);

    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxCenter = box.getCenter(new THREE.Vector3());
    const newOrigin = [boxCenter.x, boxCenter.y, 0];
    // reset the object so that it is centered at the origin
    root.position.set(-newOrigin[0], -newOrigin[1], -newOrigin[2]);
    const deltaY = box.max.y - box.min.y;

    const cameraRadius = deltaY + 13;

    const zPos = cameraRadius * Math.sin((Math.PI * zAxisAngle) / 180);

    const { x, y, upX, upY } = getNextCameraSettings(
      new Vector3(
        -cameraRadius * Math.sin((Math.PI * initialDegreesXY) / 180),
        -cameraRadius * Math.cos((Math.PI * initialDegreesXY) / 180),
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

    if (cancelledLoadingFilepaths.current.has(objFilepath)) return;

    sendBackMessage({ type: "canvasRendered", canvasId: id });
  });
};
