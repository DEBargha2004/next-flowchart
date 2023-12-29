import { useAppDispatch } from '@/hooks/redux-essentials'
import { NodeData } from '@/types/node'
import React, { useCallback } from 'react'
import { Handle, NodeProps, Position, NodeChange } from 'reactflow'
import { updateNodeData } from '@/reducers/node'
import NodeWrapper from '../node-wrapper'
import { CylinderSVG } from '../shapes'
import chroma from 'chroma-js'

function CylinderNode ({ id, data, ...props }: NodeProps<NodeData>) {
  return (
    <NodeWrapper id={id} data={data} includeInput {...props}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-xl`}
        // style={{ backgroundColor: data.color }}
        key={id}
      >
        <Handle position={Position.Top} type='target' />
        <CylinderSVG
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

export default CylinderNode
