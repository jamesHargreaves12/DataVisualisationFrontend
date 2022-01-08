import React from "react";
import "./LoadingIndicator.scss";

type LoadingIndicatorProps = {
  width: number;
  height: number;
};

export default function LoadingIndicator({
  width,
  height,
}: LoadingIndicatorProps) {
  return <div style={{ width, height }} className="loading-indicator" />;
}
