import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import "../data/master.mtl";
import { FileDetails } from "../ObjFileLoad";
import "./ObjectRenderingCellComponent.scss";
import MaterialCreator = MTLLoader.MaterialCreator;
import { Button } from "react-bootstrap";
import { Vector3 } from "three";
import {
  CameraSettings,
  getNextCameraSettings,
  SceneElement,
} from "../ObjectRenderingPaged/renderHelper";
import { getDebouncedPrint } from "../util";
import CanvasWithLoading from "../CanvasWithLoading";

export enum CellStatus {
  Unloaded,
  Loaded,
  Removed,
}
type ObjectRenderingCellProps = {
  canvasWidth: number;
  canvasHeight: number;
  fov?: number;
  // This is used so that we will only load the dom elements on the first load and after that it will just reload.
  cellNumber: number;
  cameraRadius?: number;
  objFileDetails: FileDetails;

  addScene: (sceneElement: Omit<SceneElement, "ctx">) => void;
  cellStatus: CellStatus;
  renderer: THREE.WebGLRenderer;
  material: MaterialCreator;
  removeScene: (id: string) => void;
  // shouldRotate: MutableRefObject<boolean>;
  reportCellStatusChange: (status: CellStatus) => void;
};

const useScene = (fov: number, canvasHeight: number, canvasWidth: number) => {
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(
    new THREE.PerspectiveCamera(fov, canvasWidth / canvasHeight, 0.1, 100)
  );
  useEffect(() => {
    scene.background = new THREE.Color(0xd3d3d3); // grey
    // Setup ambient light
    const intensityAmb = 1;
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
  }, []);
  return { scene, camera };
};

export default function ObjectRenderingCell(props: ObjectRenderingCellProps) {
  const defaultProps = { fov: 35, cameraRadius: 40 };
  const {
    canvasWidth,
    canvasHeight,
    fov,
    cellNumber,
    cameraRadius,
    objFileDetails,
    addScene,
    renderer,
    material,
    removeScene,
    reportCellStatusChange,
  } = {
    ...defaultProps,
    ...props,
  };
  const canvasId = `canvas-${cellNumber}`;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialDegrees = 35;
  const { scene, camera } = useScene(fov, canvasHeight, canvasWidth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvasDomElem = canvasRef.current;
    if (canvasDomElem === null) {
      console.log("Canvas null guard hit");
      return;
    }
    setLoading(true);
    const controls = new OrbitControls(camera, canvasDomElem);
    const objLoader = new OBJLoader();
    objLoader.setMaterials(material);
    objLoader.load(`src/data/${objFileDetails.filename}`, (root) => {
      setLoading(false);
      scene.add(root);
      const box = new THREE.Box3().setFromObject(root);
      const boxCenter = box.getCenter(new THREE.Vector3());
      const newOrigin = [boxCenter.x, boxCenter.y, 0];
      // reset the object so that it is centered at the origin
      root.position.set(-newOrigin[0], -newOrigin[1], -newOrigin[2]);
      controls.target.set(0, 0, 0);
      const { x, y, upX, upY } = getNextCameraSettings(
        new Vector3(
          -cameraRadius * Math.sin((Math.PI * initialDegrees) / 180),
          0.01
        )
      );
      camera.position.set(
        x,
        y,
        cameraRadius * Math.cos((Math.PI * initialDegrees) / 180)
      );
      camera.up.set(upX, upY, 0);
      controls.update();
      const debouncedPrint = getDebouncedPrint();
      addScene({
        canvasElement: canvasDomElem,
        scene,
        camera,
        renderFn: ({ x, y, upX, upY }: CameraSettings) => {
          camera.position.set(x, y, camera.position.z);
          camera.up.set(upX, upY, 0);
          controls.update();
          renderer.render(scene, camera);
        },
      });
      reportCellStatusChange(CellStatus.Loaded);
    });
    return () => {
      reportCellStatusChange(CellStatus.Unloaded);
      removeScene(canvasId);
    };
  }, [fov, canvasHeight, canvasWidth, objFileDetails.filename, material]);

  return (
    <div className={"object-rendering-group-cell"}>
      <div className={"object-rendering-group-cell__title"}>
        {objFileDetails.title}
      </div>
      <CanvasWithLoading
        width={canvasWidth}
        height={canvasHeight}
        canvasId={canvasId}
        canvasRef={canvasRef}
        loading={loading}
      />
    </div>
  );
}
