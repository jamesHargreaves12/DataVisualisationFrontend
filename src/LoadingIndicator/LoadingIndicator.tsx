import React from "react";
import "./LoadingIndicator.scss";

type LoadingIndicatorProps = {
  width: number;
  height: number;
};

// TODO remove props
export default function LoadingIndicator({
  width,
  height,
}: LoadingIndicatorProps) {
  return <div className="loading-indicator" />;
}
