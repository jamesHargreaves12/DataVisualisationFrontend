import { OffscreenEventArgs } from "../EventTypes";
import { getScenesAndIds, refreshScene } from "./renderer";
import { Float32BufferAttribute, Group, Mesh } from "three";

// I think almost the entire file here can be removed in favour of helpers/TextureCoords.
// State
export const colorPowerState = { current: 1 };

export const changeColourPower = ({
  power,
}: OffscreenEventArgs["changeColourPower"]) => {
  getScenesAndIds().forEach(async ([id, sceneElement]) => {
    sceneElement.scene.children.forEach((child) => {
      if (child instanceof Group) {
        changeColourPowerOfGroup(child, power);
      }
    });
    refreshScene(id, sceneElement);
  });
  colorPowerState.current = power;
};

const changeColourPowerOfGroup = (group: Group, power: number) => {
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      const newUvs = [
        ...child.geometry.attributes.uv.array.map((x: number) =>
          Math.pow(x, power / colorPowerState.current)
        ),
      ];
      child.geometry.setAttribute("uv", new Float32BufferAttribute(newUvs, 2));
    }
  });
};

export const setColourPowerOfNewGroup = (group: Group) => {
  // Hack alert
  changeColourPowerOfGroup(
    group,
    colorPowerState.current * colorPowerState.current
  );
};
