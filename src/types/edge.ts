export type EdgeData = {
  label?: string | null
  color?: string | null
  type?: EdgeType
  markerEnd?: string
  markerStart?: string
}

export type EdgeType = 'bezierEdge' | 'stepEdge'
