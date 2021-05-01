import Button from "@material-ui/core/Button";
import {
  sendSetCameraRadius,
  sendSetRotateSpeed,
  sendSetZAxis,
} from "../OffscreenCanvasMiddleware";
import React, { useState } from "react";
import "./RightNav.scss";
import { ICONS, MATERIAL_FILEPATHS } from "../ObjFileLoad";
import { MenuItem, Select, Slider } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconedSlider from "./IconedSlider/IconedSlider";
type RightNavProps = {
  rotateToggle: () => void;
  allCellsLoaded: boolean;
  currentTheme: string;
  changeTheme: (fp: string) => void;
};

export default function RightNav({
  rotateToggle,
  allCellsLoaded,
  currentTheme,
  changeTheme,
}: RightNavProps) {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [zAxisAngle, setZAxisAngle] = useState(55); // TODO config file since repeated
  const [cameraRadius, setCameraRadius] = useState(40);
  const changeZAxisAngle = (newVal: number) => {
    setZAxisAngle(newVal);
    sendSetZAxis(newVal);
  };
  const changeRotation = (newVal: number) => {
    setRotationSpeed(newVal);
    sendSetRotateSpeed(newVal);
  };
  const changeCameraRadius = (newVal: number) => {
    setCameraRadius(newVal);
    sendSetCameraRadius(newVal);
  };
  return (
    <div className={"right-nav"}>
      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          marginLeft: "8px",
          color: "#5D5C61", // copied from colors.scss TODO
          fontSize: "20px",
        }}
      >
        Visualisation Settings
      </div>
      <div
        style={{
          width: "50px",
          height: "2px",
          backgroundColor: "#5D5C61", // copied from colors.scss
          marginLeft: "8px",
        }}
      ></div>
      <Select
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value as string)}
        input={<Input disableUnderline />}
        variant={"filled"}
        renderValue={(value: unknown) => {
          const fp = value as string;
          return (
            <img src={fp} key={fp} style={{ width: "90%", height: "50px" }} />
          );
        }}
        className="right-nav__select"
        style={{ marginTop: "20px" }}
      >
        {MATERIAL_FILEPATHS.map((fp) => (
          <MenuItem key={fp} value={fp}>
            <img src={fp} key={fp} style={{ width: "90%", height: "50px" }} />
          </MenuItem>
        ))}
      </Select>
      <Button
        onClick={rotateToggle}
        disabled={!allCellsLoaded}
        variant="contained"
        className={"right-nav__button"}
        style={{ marginTop: "20px" }}
      >
        <img src={ICONS.rotate} />
      </Button>
      <IconedSlider
        value={rotationSpeed}
        onChange={changeRotation}
        leftIconSrc={ICONS.snailSilhouette}
        rightIconSrc={ICONS.hare}
        max={4}
        min={0.1}
        step={0.00001}
      />
      <IconedSlider
        value={zAxisAngle}
        onChange={changeZAxisAngle}
        leftIconSrc={ICONS.smallAngle}
        rightIconSrc={ICONS.largeAngle}
        max={85}
        min={5}
        step={0.0001}
      />
      <IconedSlider
        value={cameraRadius}
        onChange={changeCameraRadius}
        leftIconSrc={ICONS.smallCircle}
        rightIconSrc={ICONS.bigCircle}
        max={85}
        min={20}
        step={0.0001}
      />
    </div>
  );
}
