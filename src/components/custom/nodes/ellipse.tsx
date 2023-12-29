import { useAppDispatch } from '@/hooks/redux-essentials'
import { NodeData } from '@/types/node'
import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { updateNode, updateNodeData } from '@/reducers/node'
import NodeWrapper from '../node-wrapper'
import { EllipseSVG } from '../shapes'
import chroma from 'chroma-js'

function EllipseNode ({ id, data, ...props }: NodeProps<NodeData>) {
  return (
    <NodeWrapper id={id} data={data} includeInput {...props}>
      <div
        className={`flex h-full w-full items-center justify-center relative`}
        key={id}
      >
        <Handle position={Position.Top} type='target' />
        <EllipseSVG
          fill={data.color}
          height={data.height}
          width={data.width}
          strokeColor={chroma(data.color).brighten().hex()}
          strokeWidth={2}
        />
        <Handle position={Position.Bottom} type='source' />
      </div>
    </NodeWrapper>
  )
}

export default EllipseNode
