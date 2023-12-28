function PlusSVG ({
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
        points={`${width / 3},${strokeWidth / 2} ${(2 * width) / 3},${
          strokeWidth / 2
        } ${(2 * width) / 3},${height / 3} ${width - strokeWidth / 2},${
          height / 3
        } ${width - strokeWidth / 2},${(2 * height) / 3} ${(2 * width) / 3},${
          (2 * height) / 3
        } ${(2 * width) / 3},${height - strokeWidth / 2} ${width / 3},${
          height - strokeWidth / 2
        } ${width / 3},${(2 * height) / 3} ${strokeWidth / 2},${
          (2 * height) / 3
        } ${strokeWidth / 2},${height / 3} ${width / 3},${height / 3} ${
          width / 3
        },${strokeWidth / 2}`}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default PlusSVG
