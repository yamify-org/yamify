"use client";

import React from "react";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const clamp = Math.min(Math.max(percentage, 0), 100);
  const startAngle = -90;
  const endAngle = startAngle + (clamp / 100) * 180;

  return (
    <div className="progress-container">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <path
          d={describeArc(20, 20, 18, startAngle, endAngle)}
          className="progress-arc"
        />
      </svg>
      <span className="progress-text">{clamp}%</span>
    </div>
  );
};

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export default CircularProgress;
