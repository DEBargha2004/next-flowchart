import React from 'react'

import type { BaseEdgeProps } from 'reactflow'

const CustomBaseEdge = ({ path }: BaseEdgeProps) => {
  return (
    <path
      d={path}
      stroke='#000'
      strokeWidth={10}
      className='react-flow__edge-path'
      data-state='open'
    />
  )
}

export default CustomBaseEdge
