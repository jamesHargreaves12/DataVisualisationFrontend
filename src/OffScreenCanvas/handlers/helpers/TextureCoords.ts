// Theres a question of whether we want to set the bottom squares from the top of the column - for now we will ignore this complexity.
import { BufferGeometry, Float32BufferAttribute, Group, Mesh } from "three";
import { colorPowerState } from "../changeColourPower";

const arrayMax = (arr: number[]) => {
  return arr.reduce((p, v) => (p > v ? p : v));
};

export const setColorOfVerticesFromHeight = (
  mesh: Mesh<BufferGeometry>,
  heightsOverride?: number[]
) => {
  const heights =
    heightsOverride ??
    Array.from(mesh.geometry.attributes.position.array).filter(
      (_, i) => i % 3 === 2
    );
  const maxZ = arrayMax(heights);
  const uvArray = Array.from(mesh.geometry.attributes.uv.array);

  const newUvs = uvArray.map((_, i) => {
    const z = heights[Math.floor(i / 2)];
    return Math.pow((z / maxZ) * 0.95 + 0.025, colorPowerState.current);
  });
  mesh.geometry.setAttribute("uv", new Float32BufferAttribute(newUvs, 2));
};

export const setColourFromHeight = (group: Group) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      setColorOfVerticesFromHeight(child);
    }
  });
};
