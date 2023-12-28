import { NodeData } from '@/types/node'
import { Handle, NodeProps, Position } from 'reactflow'
import NodeWrapper from '../node-wrapper'
import { updateNode } from '@/reducers/node'
import { useAppDispatch } from '@/hooks/redux-essentials'
import { DiamondSVG } from '../shapes'

function DiamondNode ({ data, id }: NodeProps<NodeData>) {
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNode({ id: id, data: { ...data, label: e.target.value } }))
  }
  return (
    <NodeWrapper id={id} height={data.height} width={data.width}>
      <div className='relative h-full w-full'>
        <Handle position={Position.Top} type='target' />
        <DiamondSVG
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
          className='resize-none overflow-hidden border-none bg-transparent text-center outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          '
        />
        <Handle position={Position.Bottom} type='source' />
      </div>
    </NodeWrapper>
  )
}

export default DiamondNode
