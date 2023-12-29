import { NodeData } from '@/types/node'
import { Handle, NodeProps, Position } from 'reactflow'
import NodeWrapper from '../node-wrapper'
import { PentagonSVG } from '../shapes'
import { useAppDispatch } from '@/hooks/redux-essentials'
import { updateNode, updateNodeData } from '@/reducers/node'
import chroma from 'chroma-js'

function PentagonNode ({ data, id, ...props }: NodeProps<NodeData>) {
  return (
    <NodeWrapper id={id} data={data} includeInput {...props}>
      <Handle position={Position.Top} type='target' />
      <PentagonSVG
        fill={data.color}
        height={data.height}
        width={data.width}
        strokeColor={chroma(data.color).brighten().hex()}
        strokeWidth={2}
      />
      <Handle position={Position.Bottom} type='source' />
    </NodeWrapper>
  )
}

export default PentagonNode
