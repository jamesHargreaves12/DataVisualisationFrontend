import React, { Ref } from "react";
import "./CanvasWithLoading.scss";

type CanvasWithLoadingProps = {
  width: number;
  height: number;
  canvasId: string;
  // TODO improve
  canvasRef: Ref<any>;
  loading: boolean;
};
export default function CanvasWithLoading({
  width,
  height,
  canvasId,
  canvasRef,
  loading,
}: CanvasWithLoadingProps) {
  return (
    <div className="canvas-with-loading">
      <canvas
        id={canvasId}
        ref={canvasRef}
        className={
          loading
            ? "canvas-with-loading--loading"
            : "canvas-with-loading--loaded"
        }
        style={{
          width: width,
          height: height,
          display: "inline-block",
        }}
      />
    </div>
  );
}
