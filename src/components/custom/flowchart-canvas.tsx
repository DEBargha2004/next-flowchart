import { useAppDispatch, useAppState } from '@/hooks/redux-essentials'
import React, { useCallback, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Connection,
  Controls,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  NodeProps
} from 'reactflow'

import { setWindowDimension } from '@/reducers/window-resizer'
import { createEdge, deleteEdge } from '@/reducers/edge'
import { updateNode } from '@/reducers/node'
import ShapesBucket from './shapes-bucket'
import { NodeData, NodeType } from '@/types/node'
import nodesCollection from '../custom/nodes/index'
import 'reactflow/dist/style.css'

function FlowChartCanvas () {
  const dispatch = useAppDispatch()

  const nodeTypes: Partial<
    Record<NodeType, React.JSXElementConstructor<NodeProps<NodeData>>>
  > = useMemo(
    () => ({
      ellipseNode: nodesCollection.EllipseNode,
      rectangleNode: nodesCollection.RectangleNode,
      roundedRectangleNode: nodesCollection.RoundRectangleNode,
      hexagonNode: nodesCollection.HexagonNode,
      diamondNode: nodesCollection.DiamondNode,
      pentagonNode: nodesCollection.PentagonNode,
      cylinderNode: nodesCollection.CylinderNode,
      parallelogramNode: nodesCollection.ParallelogramNode,
      plusNode: nodesCollection.PlusNode,
      triangleNode: nodesCollection.TriangleNode
    }),
    []
  )

  const nodes = useAppState(state => state.nodes.nodes)
  const edges = useAppState(state => state.edges)

  useEffect(() => {
    console.log('mounted flowchart canvas')

    const handleWindowResize = (e: UIEvent) => {
      dispatch(
        setWindowDimension({
          h: e.currentTarget?.innerHeight,
          w: e.currentTarget?.innerWidth
        })
      )
    }
    window.addEventListener('resize', handleWindowResize)
    const h = window.innerHeight
    const w = window.innerWidth

    dispatch(
      setWindowDimension({
        h,
        w
      })
    )
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const onConnect = useCallback(
    (params: Connection) =>
      dispatch(
        createEdge({
          id: crypto.randomUUID(),
          source: params.source,
          target: params.target,
          // animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 30,
            height: 30
          },
          type: 'smoothstep'
        })
      ),
    []
  )

  const handleNodeContextMenu = useCallback(
    (
      e: React.MouseEvent<Element, MouseEvent>,
      node: Node<NodeData, string | undefined>
    ) => {
      e.preventDefault()
      console.log(node)
    },
    []
  )

  const handleNodeChange = useCallback((nodeChange: NodeChange[]) => {
    // console.log(nodeChange)

    dispatch(updateNode(nodeChange))
  }, [])
  return (
    <>
      <ReactFlow
        //@ts-ignore
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={(edgeChange: EdgeChange[]) => {
          console.log(edgeChange)
        }}
        fitView
        onConnect={onConnect}
        onNodeContextMenu={handleNodeContextMenu}
        nodeTypes={nodeTypes}
        onEdgeClick={(_, clicked_edge) => {
          dispatch(deleteEdge({ id: clicked_edge.id }))
        }}
      >
        <Background gap={14} size={1} />
        <Controls />
      </ReactFlow>
      <ShapesBucket position='top-left' />
    </>
  )
}

export default FlowChartCanvas
