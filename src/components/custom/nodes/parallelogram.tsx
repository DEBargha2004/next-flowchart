import { useAppDispatch } from '@/hooks/redux-essentials'
import { NodeData } from '@/types/node'
import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { updateNode } from '@/reducers/node'
import NodeWrapper from '../node-wrapper'
import { ParallelogramSVG } from '../shapes'

function ParallelogramNode ({ id, data }: NodeProps<NodeData>) {
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNode({ id: id, data: { ...data, label: e.target.value } }))
  }
  return (
    <NodeWrapper id={id} height={data.height} width={data.width}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-xl`}
        // style={{ backgroundColor: data.color }}
        key={id}
      >
        <Handle position={Position.Top} type='target' />
        <ParallelogramSVG
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
          className='resize-none overflow-hidden text-sm border-none bg-transparent text-center outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
        <Handle position={Position.Bottom} type='source' />
      </div>
    </NodeWrapper>
  )
}

export default ParallelogramNode
