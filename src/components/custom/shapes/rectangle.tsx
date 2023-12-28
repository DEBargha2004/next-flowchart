function RectangleSVG ({
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
      <rect
        transform={`translate(${strokeWidth / 2},${strokeWidth / 2})`}
        height={height - strokeWidth}
        width={width - strokeWidth}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </svg>
  )
}

export default RectangleSVG
