import { OffscreenEventArgs } from "../EventTypes";
import { BufferGeometry, Float32BufferAttribute, Group, Mesh } from "three";
import { getScenesAndIds, refreshScene, SceneElement } from "./renderer";
import { setColourPowerOfNewGroup } from "./changeColourPower";
import { arrayMax } from "three/src/utils";
import { setColorOfVerticesFromHeight } from "./helpers/TextureCoords";

export const heightCapState: {
  capPercent: number;
  originalHeights: { [key: string]: number[] };
} = { capPercent: 100, originalHeights: {} }; // TODO default defined in two places.
// TODO clean up originalHeights when deleting scene

export const setHeightCap = ({
  capPercent,
}: OffscreenEventArgs["setHeightCap"]) => {
  console.log(capPercent);
  heightCapState.capPercent = capPercent;
  getScenesAndIds().forEach(async ([id, sceneElement]) => {
    AdjustSceneByHeightCap(id, sceneElement);
    refreshScene(id, sceneElement);
  });
};

const AdjustSceneByHeightCap = (id: string, sceneElement: SceneElement) => {
  sceneElement.scene.children.forEach((child) => {
    if (child instanceof Group) {
      if (child.children.length !== 1 || !(child.children[0] instanceof Mesh))
        // TODO we could utilise user-defined type guard function here
        throw new Error(
          "Expected group to have a single child which was a Mesh"
        ); // If scenes become more complex down the line then this may not hold but for now this is fine.
      const mesh = child.children[0] as Mesh<BufferGeometry>;
      const originalHeightsForMesh = getOrSaveOriginalHeights(id, mesh);
      changeHeightCapOfMesh(mesh, originalHeightsForMesh);
      setColourPowerOfNewGroup(child);
    }
  });
};

export const getOrSaveOriginalHeights = (id: string, mesh: Mesh) => {
  if (heightCapState.originalHeights[id])
    return heightCapState.originalHeights[id];
  if (!(mesh.geometry instanceof BufferGeometry))
    throw new Error("Expected BufferGeometry"); // Used this as the typing suggests that this can be Geometry rather than BufferGeometry but I don't think this is the case.
  heightCapState.originalHeights[id] = Array.from(
    mesh.geometry.attributes.position.array
  ).filter((_, i) => i % 3 === 2); // array is x,y,z
  return heightCapState.originalHeights[id];
};

// TODO remove the requirement for colour to be sent over the wire.
const changeHeightCapOfMesh = (
  mesh: Mesh<BufferGeometry>,
  originalHeights: number[]
) => {
  const cap = heightCapState.capPercent / 100;
  const max_z = arrayMax(originalHeights);
  const newHeights = originalHeights.map((x) => Math.min(x, cap * max_z) / cap);
  const positions = Array.from(mesh.geometry.attributes.position.array);
  const newPositions = positions.map((val, i) => {
    if (i % 3 == 2) return Math.min(newHeights[Math.floor(i / 3)]); // z
    return val; // x,y
  });
  mesh.geometry.setAttribute(
    "position",
    new Float32BufferAttribute(newPositions, 3)
  );
  setColorOfVerticesFromHeight(mesh, newHeights);
};

export const applyHeightCap = (group: Group) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      setColorOfVerticesFromHeight(child);
    }
  });
};
