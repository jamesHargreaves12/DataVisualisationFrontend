import { OffscreenEventArgs } from "../EventTypes";
import { getScenesAndIds, refreshScene } from "./renderer";
import { Float32BufferAttribute, Group, Mesh } from "three";

// State
var currentPower = 1;

export const changeColourPower = ({
  power,
}: OffscreenEventArgs["changeColourPower"]) => {
  console.log("ChangeColourPower", power);
  getScenesAndIds().forEach(async ([id, sceneElement]) => {
    sceneElement.scene.children.forEach((child) => {
      if (child instanceof Group) {
        changeColourPowerOfGroup(child, power);
      }
    });
    refreshScene(id, sceneElement);
  });
  currentPower = power;
};

const changeColourPowerOfGroup = (group: Group, power: number) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh && child.geometry.attributes.uv) {
      const newUvs = [
        ...child.geometry.attributes.uv.array.map((x: number) =>
          Math.pow(x, power / currentPower)
        ),
      ];
      child.geometry.setAttribute("uv", new Float32BufferAttribute(newUvs, 2));
    }
  });
};
