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
  Node,
  NodeChange,
  NodeMouseHandler,
  NodeProps,
  OnConnect,
  OnEdgeUpdateFunc
} from 'reactflow'

import { setWindowDimension } from '@/reducers/window-resizer'
import {
  createEdge,
  deleteEdge,
  updateConnection,
  updateEdge,
  updateEdgeProps
} from '@/reducers/edge'
import { updateNode } from '@/reducers/node'
import ShapesBucket from './shapes-bucket'
import { NodeData, NodeType } from '@/types/node'
import nodesCollection from './nodes/index'
import edgeCollection from './edges/index'
import 'reactflow/dist/style.css'
import { EdgeData, EdgeType } from '@/types/edge'
import { cn } from '@/lib/utils'
import CustomContextMenuItem from './contextmenu/contextmenu-item'

type ContextMenuPosition = {
  x: number
  y: number
} | null

function FlowChartCanvas () {
  const [edgeContextMenu, setEdgeContextMenu] =
    useState<ContextMenuPosition>(null)

  const edgeContextMenuRef = useRef<HTMLDivElement>(null)

  const edgeType: EdgeType[] = ['bezierEdge', 'stepEdge']

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
          data: { label: 'bezierEdge' }
        })
      ),
    []
  )

  const handleNodeContextMenu: NodeMouseHandler = useCallback((e, node) => {
    e.preventDefault()
  }, [])

  const handleEdgeContextMenu: EdgeMouseHandler = useCallback((e, edge) => {
    e.preventDefault()
    const { clientX, clientY } = e
    const calculatedMenuWidth = window.innerWidth - clientX
    const calculatedMenuHeight = window.innerHeight - clientY
    const contextMenuPosition: ContextMenuPosition = { x: clientX, y: clientY }
    contextMenuPosition.x = calculatedMenuWidth < 200 ? clientX - 200 : clientX
    contextMenuPosition.y = calculatedMenuHeight < 72 ? clientY - 72 : clientY
    setEdgeContextMenu(contextMenuPosition)
  }, [])

  const handleNodeChange = useCallback((nodeChange: NodeChange[]) => {
    dispatch(updateNode(nodeChange))
  }, [])

  const handleEdgeChange = useCallback((edgeChange: EdgeChange[]) => {
    dispatch(updateEdge(edgeChange))
  }, [])

  const handleEdgeUpdate: OnEdgeUpdateFunc<EdgeData> = useCallback(
    (oldEdge: Edge<EdgeData>, newConnection: Connection) => {
      console.log(oldEdge)

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
      {edgeContextMenu ? (
        <div
          className={cn(
            `absolute w-[200px] h-fit p-1 rounded-md overflow-hidden inset-3 cursor-pointer backshadow transition-all bg-white border border-slate-700`
          )}
          style={{ top: edgeContextMenu.y, left: edgeContextMenu.x }}
          ref={edgeContextMenuRef}
        >
          {edgeType.map(type => (
            <CustomContextMenuItem key={type}>{type}</CustomContextMenuItem>
          ))}
        </div>
      ) : null}
      <ShapesBucket position='top-left' />
    </>
  )
}

export default FlowChartCanvas
