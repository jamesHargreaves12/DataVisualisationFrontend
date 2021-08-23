import Button from "@material-ui/core/Button";
import {
  sendSetCameraRadius,
  sendSetColourPower,
  sendSetHeightCap,
  sendSetRotateSpeed,
  sendSetZAxis,
} from "../OffscreenCanvasMiddleware";
import React, { useContext, useState } from "react";
import "./RightNav.scss";
import { MenuItem, Select } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconedSlider from "./IconedSlider/IconedSlider";
import colours from "../CSSColours";
import renderingSettingsContext, {
  CanvasStatus,
} from "../RenderingContext/RenderingContext";
import { debounced } from "../util";
import { MATERIAL_FILEPATHS } from "../FileLoader/Materials";
import { ICONS } from "../FileLoader/Icons";

type RightNavProps = { numberOfCellsOnPage: number };

const debouncedSendHeightCap = debounced((x: number) => sendSetHeightCap(x));
const debouncedSendSetColourPower = debounced((x: number) =>
  sendSetColourPower(x)
);

export default function RightNav({ numberOfCellsOnPage }: RightNavProps) {
  const {
    isRotating,
    setRotating,
    currentTheme,
    setTheme,
    canvasStatuses,
  } = useContext(renderingSettingsContext);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [zAxisAngle, setZAxisAngle] = useState(55); // TODO config file since repeated
  const [cameraRadius, setCameraRadius] = useState(40);
  const [heightCap, setHeightCap] = useState(100);
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

  const changeHeightCap = (newVal: number) => {
    setHeightCap(newVal);
    debouncedSendHeightCap(newVal);
  };

  const changeColourPower = (newVal: number) => {
    setCurrentColourPower(newVal);
    debouncedSendSetColourPower(newVal);
  };

  return (
    <div className={"right-nav"}>
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
        value={85 - cameraRadius} // Invert the values so that the sliding is more natural
        onChange={(val) => changeCameraRadius(85 - val)}
        leftIconSrc={ICONS.smallCircle}
        rightIconSrc={ICONS.bigCircle}
        max={65}
        min={0}
        step={0.0001}
      />
      <IconedSlider
        value={heightCap}
        onChange={changeHeightCap}
        leftIconSrc={ICONS.smallCircle} // TODO
        rightIconSrc={ICONS.bigCircle} // TODO
        max={100}
        min={1}
        step={1}
      />
    </div>
  );
}
