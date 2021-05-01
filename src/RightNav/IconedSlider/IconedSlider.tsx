import { Slider } from "@material-ui/core";
import React from "react";

type IconedSliderProps = {
  value: number;
  onChange: (newVal: number) => void;
  leftIconSrc: string;
  rightIconSrc: string;
  min: number;
  max: number;
  step: number;
};

export default function IconedSlider({
  value,
  onChange,
  leftIconSrc,
  rightIconSrc,
  min,
  max,
  step,
}: IconedSliderProps) {
  return (
    <>
      <div
        style={{
          padding: "0 8px",
          height: "40px",
          display: "flex",
          alignItems: "baseline",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "-5px", // just to bring the icons slightly closer to the slider
          marginTop: "20px",
        }}
      >
        <img src={leftIconSrc} width={40} />
        <img src={rightIconSrc} width={40} />
      </div>
      <Slider
        value={value}
        max={max}
        min={min}
        step={step}
        onChange={(e, v) => onChange(v as number)}
        style={{
          width: "95%",
          margin: "auto",
        }}
      />
    </>
  );
}
