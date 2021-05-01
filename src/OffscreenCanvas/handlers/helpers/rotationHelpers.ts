import { Vector3 } from "three";
import { getDebouncedPrint } from "../../../util";
export type CameraSettings = { x: number; y: number; upX: number; upY: number };

const getXYPlanePolarCoords = ({ x, y, z }: Vector3, cameraRadius: number) => {
  const radiusXYPlane = Math.sqrt(cameraRadius ** 2 - z ** 2);
  const angleXYPlane = Math.atan2(y, x); // Radians
  return { radiusXYPlane, angleXYPlane };
};

export const getXYAngleBetween = (p1: Vector3, p2: Vector3) => {
  const angleXYPlane1 = Math.atan2(p1.y, p1.x);
  const angleXYPlane2 = Math.atan2(p2.y, p2.x);
  return angleXYPlane2 - angleXYPlane1;
};

export const getNextCameraSettings = (
  point: Vector3,
  deltaTheta: number = 0,
  cameraRadius: number
): CameraSettings => {
  const { radiusXYPlane, angleXYPlane } = getXYPlanePolarCoords(
    point,
    cameraRadius
  );
  const newAngleXY = angleXYPlane + deltaTheta;
  return {
    x: radiusXYPlane * Math.cos(newAngleXY),
    y: radiusXYPlane * Math.sin(newAngleXY),
    upX: -Math.cos(newAngleXY),
    upY: -Math.sin(newAngleXY),
  };
};

export const getAveragePosition = (points: Vector3[]) => {
  const acc = new Vector3(0, 0, 0);
  points.forEach((point) => {
    acc.x += point.x;
    acc.y += point.y;
    acc.z += point.z;
  });
  return acc;
};
