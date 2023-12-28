function DiamondSVG ({
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
        points={`${width / 2},${strokeWidth / 2} ${width - strokeWidth / 2},${
          height / 2
        } ${width / 2},${height - strokeWidth / 2} ${strokeWidth / 2},${
          height / 2
        }`}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default DiamondSVG
