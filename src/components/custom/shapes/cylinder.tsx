function CylinderSVG ({
  height,
  width,
  strokeColor,
  strokeWidth,
  fill
}: {
  height: number
  width: number
  strokeColor: string
  strokeWidth: number
  fill: string
}) {
  return (
    <svg width={width} height={height}>
      <ellipse
        cx={width / 2}
        cy={height / 4}
        rx={width / 2 - strokeWidth / 2}
        ry={height / 4 - strokeWidth / 2}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d={`M${width - strokeWidth / 2},${height / 4} L${
          width - strokeWidth / 2
        },${0.8 * height} a ${width / 2} ${height / 4} 0 0 1 -${
          width - strokeWidth
        },0 L${strokeWidth / 2},${height / 4}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </svg>
  )
}

export default CylinderSVG
