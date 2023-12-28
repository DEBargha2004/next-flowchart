import { useAppDispatch, useAppState } from '@/hooks/redux-essentials'
import React, { useCallback, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Connection,
  Controls,
  EdgeChange,
  MarkerType,
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

  const nodes = useAppState(state => state.nodes)
  const edges = useAppState(state => state.edges)

  useEffect(() => {
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
  return (
    <>
      <ReactFlow
        //@ts-ignore
        nodes={nodes}
        edges={edges}
        onNodesChange={node =>
          dispatch(
            updateNode({
              id: node[0].id,
              position: node[0].position
            })
          )
        }
        onEdgesChange={(edgeChange: EdgeChange[]) => {
          console.log(edgeChange)
        }}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onEdgeClick={(_, clicked_edge) => {
          dispatch(deleteEdge({ id: clicked_edge.id }))
        }}
      >
        <Background gap={14} size={1} />
        <Controls />
        {/* <MiniMap
        // nodeColor={(node: Node<NodeData>) => node.data.color}
        // nodeComponent={node => <MinimapNode node={node} key={node.id} />}
        /> */}
      </ReactFlow>
      <ShapesBucket position='top-left' />
    </>
  )
}

export default FlowChartCanvas
