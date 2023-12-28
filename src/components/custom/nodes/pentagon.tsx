import { NodeData } from '@/types/node'
import { NodeProps } from 'reactflow'
import NodeWrapper from '../node-wrapper'
import { PentagonSVG } from '../shapes'

function PentagonNode ({ data, id }: NodeProps<NodeData>) {
  return (
    <NodeWrapper id={id} height={data.height} width={data.width}>
      <PentagonSVG
        fill={data.color}
        height={data.height}
        width={data.width}
        strokeColor='#000'
        strokeWidth={2}
      />
    </NodeWrapper>
  )
}

export default PentagonNode
