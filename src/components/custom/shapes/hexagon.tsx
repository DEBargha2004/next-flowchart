function HexagonSVG ({
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
        points={`
        ${width / 10},${strokeWidth / 2} 
        ${0.9 * width},${strokeWidth / 2} 
        ${width - strokeWidth / 2},${height / 2} 
        ${0.9 * width},${height - strokeWidth / 2} 
        ${width / 10},${height - strokeWidth / 2} 
        ${strokeWidth / 2},${height / 2}`}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default HexagonSVG
