import { OffscreenEventArgs } from "../EventTypes";
import { getScenesAndIds } from "./renderer";
import { Group, Mesh, MeshPhongMaterial } from "three";
import { getMaterialCreator } from "./helpers/materialLoader";

export const changeMaterial = ({
  materialLocation,
}: OffscreenEventArgs["changeMaterial"]) => {
  getScenesAndIds().forEach(async ([id, { scene }]) => {
    const materialCreator = await getMaterialCreator(materialLocation);
    const newMaterial = materialCreator.create();
    scene.children.forEach((child) => {
      if (child instanceof Group) {
        changeMaterialOfGroup(child, newMaterial);
      }
    });
  });
};

const changeMaterialOfGroup = (
  group: Group,
  newMaterial: MeshPhongMaterial
) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      child.material = newMaterial;
    }
  });
};
