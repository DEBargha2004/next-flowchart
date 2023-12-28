export type PayloadNodeData = {
  id: string
  position?: {
    x: number
    y: number
  }
  type?: NodeType
  data?: {
    color?: string
    label?: string
    height?: number
    width?: number
  }
}

export type CreatePayloadNodeData = {
  id: string
  position?: {
    x: number
    y: number
  }
  type?: NodeType
  data?: NodeData
}

export type UpdatePayloadNodeData = {
  id: string
  position?: {
    x: number
    y: number
  }
  type?: NodeType
  data?: {
    color?: string
    label?: string
    height?: number
    width?: number
  }
}

export type NodeData = {
  color: string
  label: string
  height: number
  width: number
}

export type NodeType =
  | 'ellipseNode'
  | 'rectangleNode'
  | 'roundedRectangleNode'
  | 'hexagonNode'
  | 'diamondNode'
  | 'pentagonNode'
  | 'cylinderNode'
  | 'triangleNode'
  | 'parallelogramNode'
  | 'plusNode'
