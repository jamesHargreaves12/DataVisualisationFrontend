import Button from "@material-ui/core/Button";
import {
  sendSetCameraRadius,
  sendSetColourPower,
  sendSetHeightCap,
  sendSetRotateSpeed,
  sendSetZAxis,
} from "../OffscreenCanvasMiddleware";
import React, { useContext, useEffect, useState } from "react";
import "./RightNav.scss";
import { MenuItem, Select } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconedSlider from "./IconedSlider/IconedSlider";
import colours from "../CSSColours";
import renderingSettingsContext, {
  CanvasStatus,
} from "../RenderingContext/RenderingContext";
import { debounced, INITIAL_RENDERING_SETTINGS } from "../util";
import { MATERIAL_FILEPATHS } from "../FileLoader/Materials";
import { ICONS } from "../FileLoader/Icons";
import { RightNavSettings } from "../FileLoader/Datasets";

type RightNavProps = {
  numberOfCellsOnPage: number;
  rightNavDefaultSettings: RightNavSettings;
};

const debouncedSendHeightCap = debounced((x: number) => sendSetHeightCap(x));
const debouncedSendSetColourPower = debounced((x: number) =>
  sendSetColourPower(x)
);

export default function RightNav({
  numberOfCellsOnPage,
  rightNavDefaultSettings,
}: RightNavProps) {
  const {
    isRotating,
    setRotating,
    currentTheme,
    setTheme,
    canvasStatuses,
  } = useContext(renderingSettingsContext);
  const [rotationSpeed, setRotationSpeed] = useState(INITIAL_RENDERING_SETTINGS.ROTATION_SPEED);
  const [zAxisAngle, setZAxisAngle] = useState(INITIAL_RENDERING_SETTINGS.Z_AXIS_ANGLE);
  const [cameraRadius, setCameraRadius] = useState(INITIAL_RENDERING_SETTINGS.CAMERA_RADIUS);
  const [heightCap, setHeightCap] = useState(INITIAL_RENDERING_SETTINGS.HEIGHT_CAP_PERCENT);
  const [currentColourPower, setCurrentColourPower] = useState(1);
  const loadedCount = Object.values(canvasStatuses).filter(
    (x) => x === CanvasStatus.Loaded
  ).length;
  const allCellsLoaded = loadedCount === numberOfCellsOnPage;

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
  useEffect(() => {
    changeCameraRadius(rightNavDefaultSettings.cameraRadius ?? INITIAL_RENDERING_SETTINGS.CAMERA_RADIUS);
  }, [rightNavDefaultSettings.cameraRadius]);

  const changeHeightCap = (newVal: number) => {
    setHeightCap(newVal);
    debouncedSendHeightCap(newVal);
  };

  const changeColourPower = (newVal: number) => {
    setCurrentColourPower(newVal);
    debouncedSendSetColourPower(newVal);
  };

  useEffect(() => {
    changeColourPower(rightNavDefaultSettings.colorExponent ?? 1);
  }, [rightNavDefaultSettings.colorExponent]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          marginLeft: "8px",
          color: colours.Black,
          fontSize: "20px",
        }}
      >
        Visualisation Settings
      </div>
      <div
        style={{
          width: "50px",
          height: "2px",
          backgroundColor: colours.Black,
          marginLeft: "8px",
        }}
      />
      <Select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as string)}
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
      <IconedSlider
        value={currentColourPower}
        onChange={changeColourPower}
        leftIconSrc={ICONS.colourLowPower}
        rightIconSrc={ICONS.colourHighPower}
        max={4}
        min={0.1}
        step={0.00001}
      />

      <Button
        onClick={() => setRotating(!isRotating)}
        disabled={!allCellsLoaded}
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
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
        value={85 - cameraRadius} // Invert the values so that the sliding is more natural
        onChange={(val) => changeCameraRadius(85 - val)}
        leftIconSrc={ICONS.smallCircle}
        rightIconSrc={ICONS.bigCircle}
        max={75}
        min={0}
        step={0.0001}
      />
      <IconedSlider
        value={heightCap}
        onChange={changeHeightCap}
        leftIconSrc={ICONS.withCap}
        rightIconSrc={ICONS.noCap}
        max={100}
        min={1}
        step={1}
      />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flexGrow: 3 }} />
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() =>
              alert(
                "3D models of datasets have been built in such a way that 3D printing them is easy. Currently waiting on a 3D printer to arrive before building out this feature."
              )
            }
          >
            I want a physical model
          </Button>
        </div>
      </div>
    </div>
  );
}
