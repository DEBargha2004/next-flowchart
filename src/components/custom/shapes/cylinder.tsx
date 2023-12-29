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
      <path
        transform='translate(0,-3)'
        d={`
        M${strokeWidth / 2},${height / 4}
        a ${width / 2} ${height / 4} 0 0 1 ${width - strokeWidth},0
        a ${width / 2} ${height / 4} 0 0 1 -${width - strokeWidth},0
        M${width - strokeWidth / 2},${height / 4} 
        L${width - strokeWidth / 2},${0.8 * height} 
        a ${width / 2} ${height / 4} 0 0 1 -${width - strokeWidth},0 
        L${strokeWidth / 2},${height / 4}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </svg>
  )
}

export default CylinderSVG
