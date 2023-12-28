import { useAppDispatch } from '@/hooks/redux-essentials'
import { NodeData } from '@/types/node'
import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { updateNode } from '@/reducers/node'
import NodeWrapper from '../node-wrapper'
import { HexagonSVG } from '../shapes'

function HexagonNode ({ id, data }: NodeProps<NodeData>) {
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNode({ id: id, data: { ...data, label: e.target.value } }))
  }
  return (
    <NodeWrapper id={id} height={data.height} width={data.width}>
      <div
        className={`flex h-full w-full items-center justify-center`}
        // style={{ backgroundColor: data.color }}
        key={id}
      >
        <Handle position={Position.Top} type='target' />
        <HexagonSVG
          fill={data.color}
          height={data.height}
          width={data.width}
          strokeColor='#000'
          strokeWidth={2}
        />
        <Handle position={Position.Bottom} type='source' />
      </div>
    </NodeWrapper>
  )
}

export default HexagonNode
