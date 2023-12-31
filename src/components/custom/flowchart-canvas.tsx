import { useAppDispatch, useAppState } from '@/hooks/redux-essentials'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  EdgeMouseHandler,
  EdgeProps,
  MarkerType,
  NodeChange,
  NodeMouseHandler,
  NodeProps,
  OnConnect,
  OnEdgeUpdateFunc
} from 'reactflow'

import { setWindowDimension } from '@/reducers/window-resizer'
import { createEdge, updateConnection, updateEdge } from '@/reducers/edge'
import { updateNode } from '@/reducers/node'
import ShapesBucket from './shapes-bucket'
import { NodeData, NodeType } from '@/types/node'
import nodesCollection from './nodes/index'
import edgeCollection from './edges/index'
import 'reactflow/dist/style.css'
import { EdgeData, EdgeType } from '@/types/edge'

type ContextMenuPosition = {
  x: number
  y: number
} | null

type EdgeContextMenuProps = {
  position: ContextMenuPosition
  props: Edge<EdgeData>
  event: React.MouseEvent<Element, MouseEvent>
}

function FlowChartCanvas () {
  const [edgeContextMenu, setEdgeContextMenu] =
    useState<EdgeContextMenuProps | null>(null)

  const edgeContextMenuRef = useRef<HTMLDivElement>(null)

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

  const edgeTypes: Partial<
    Record<EdgeType, React.JSXElementConstructor<EdgeProps<EdgeData>>>
  > = useMemo(
    () => ({
      bezierEdge: edgeCollection.BezierEdge,
      stepEdge: edgeCollection.StepEdge
    }),
    []
  )

  const nodes = useAppState(state => state.nodes.nodes)
  const edges = useAppState(state => state.edges.edges)

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

  const onConnect: OnConnect = useCallback(
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
          type: 'bezierEdge',
          data: { label: 'bezierEdge', type: 'bezierEdge' }
        })
      ),
    []
  )

  const handleNodeContextMenu: NodeMouseHandler = useCallback((e, node) => {
    e.preventDefault()
  }, [])

  const handleEdgeContextMenu: EdgeMouseHandler = useCallback((e, edge) => {
    e.preventDefault()
  }, [])

  const handleNodeChange = useCallback((nodeChange: NodeChange[]) => {
    dispatch(updateNode(nodeChange))
  }, [])

  const handleEdgeChange = useCallback((edgeChange: EdgeChange[]) => {
    dispatch(updateEdge(edgeChange))
  }, [])

  const handleEdgeUpdate: OnEdgeUpdateFunc<EdgeData> = useCallback(
    (oldEdge: Edge<EdgeData>, newConnection: Connection) => {
      // console.log(oldEdge)

      dispatch(updateConnection({ id: oldEdge.id, connection: newConnection }))
    },
    []
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      setEdgeContextMenu(null)
    },
    []
  )

  return (
    <>
      <ReactFlow
        //@ts-ignore
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={handleEdgeChange}
        onEdgeUpdate={handleEdgeUpdate}
        onConnect={onConnect}
        onNodeContextMenu={handleNodeContextMenu}
        onEdgeContextMenu={handleEdgeContextMenu}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onClick={handleClick}
      >
        <Background gap={14} size={1} />
        <Controls />
      </ReactFlow>

      <ShapesBucket position='top-left' />
    </>
  )
}

export default FlowChartCanvas
