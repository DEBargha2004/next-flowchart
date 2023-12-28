import { useAppDispatch } from '@/hooks/redux-essentials'
import { NodeData } from '@/types/node'
import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { updateNode } from '@/reducers/node'
import NodeWrapper from '../node-wrapper'
import { EllipseSVG } from '../shapes'

function EllipseNode ({ id, data }: NodeProps<NodeData>) {
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNode({ id: id, data: { ...data, label: e.target.value } }))
  }
  return (
    <NodeWrapper id={id} height={data.height} width={data.width}>
      <div
        className={`flex h-full w-full items-center justify-center relative`}
        key={id}
      >
        <Handle position={Position.Top} type='target' />
        <EllipseSVG
          fill={data.color}
          height={data.height}
          width={data.width}
          strokeColor='#000'
          strokeWidth={2}
        />
        <input
          value={data.label}
          spellCheck={false}
          onChange={handleInputChange}
          className='resize-none overflow-hidden border-none bg-transparent text-center text-sm outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
        <Handle position={Position.Bottom} type='source' />
      </div>
    </NodeWrapper>
  )
}

export default EllipseNode
