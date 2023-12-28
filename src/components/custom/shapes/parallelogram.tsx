function ParallelogramSVG ({
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
      <polygon
        points={`${width / 4},${strokeWidth / 2} ${width - 1},${
          strokeWidth / 2
        } ${0.75 * width},${height - strokeWidth / 2} ${strokeWidth / 2},${
          height - strokeWidth / 2
        }`}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default ParallelogramSVG
