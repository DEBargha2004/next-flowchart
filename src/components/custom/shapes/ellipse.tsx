function EllipseSVG ({
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
        cy={height / 2}
        rx={width / 2 - strokeWidth / 2}
        ry={height / 2 - strokeWidth / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </svg>
  )
}

export default EllipseSVG
