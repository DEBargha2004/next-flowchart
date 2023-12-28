import { useAppState } from '@/hooks/redux-essentials'
import { NodeData, NodeType } from '@/types/node'
import { MiniMapNodeProps, NodeProps } from 'reactflow'
import CircleNode from './nodes/ellipse'

const nodeCollection: Partial<
  Record<NodeType, React.JSXElementConstructor<NodeProps<NodeData>>>
> = {
  circularNode: CircleNode
}

function MinimapNode ({ node }: { node: MiniMapNodeProps }) {
  const nodes = useAppState(state => state.nodes)
  const nodeInfo = nodes.find(n => n.id === node.id)
  const nodeType = nodeInfo?.type

  if (nodeType) {
    const Node: React.JSXElementConstructor<NodeProps<NodeData>> | undefined =
      nodeCollection[nodeType]
    if (Node) {
      return <Node data={nodeInfo.data} id={nodeInfo.id} />
    }
  }
}

export default MinimapNode
