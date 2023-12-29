import { NodeData } from '@/types/node'
import { Handle, NodeProps, Position } from 'reactflow'
import NodeWrapper from '../node-wrapper'
import { updateNode, updateNodeData } from '@/reducers/node'
import { useAppDispatch } from '@/hooks/redux-essentials'
import { DiamondSVG } from '../shapes'
import chroma from 'chroma-js'

function DiamondNode ({ data, id, ...props }: NodeProps<NodeData>) {
  return (
    <NodeWrapper id={id} data={data} includeInput {...props}>
      <div className='relative h-full w-full'>
        <Handle position={Position.Top} type='target' />
        <DiamondSVG
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

export default DiamondNode
