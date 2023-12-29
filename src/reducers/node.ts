import {
  CreatePayloadNodeData,
  UpdatePayloadNodeData,
  type PayloadNodeData,
  NodeData,
  NodeType
} from '@/types/node'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node, NodeChange, applyNodeChanges } from 'reactflow'

const initialState: { nodes: Node<NodeData, NodeType>[] } = {
  nodes: []
}

const nodeReducer = createSlice({
  initialState,
  name: 'node',
  reducers: {
    createNode (state, action: PayloadAction<Node<NodeData, NodeType>>) {
      state.nodes.push(action.payload)
    },
    updateNode (state, action: PayloadAction<NodeChange[]>) {
      // console.log(action.payload)
      state.nodes = applyNodeChanges(action.payload, state.nodes) as Node<
        NodeData,
        NodeType
      >[]
    },
    updateNodeData (state, action: PayloadAction<UpdatePayloadNodeData>) {
      const node = state.nodes.find(node => node.id === action.payload.id)
      if (node) {
        node.data = { ...node.data, ...action.payload.data }
      }
    },
    duplicateNode (state, action: PayloadAction<{ id: string }>) {
      const node = state.nodes.find(node => node.id === action.payload.id)
      if (node) {
        state.nodes.push({
          id: crypto.randomUUID(),
          data: { ...node.data },
          position: { x: node.position.x + 10, y: node.position.y + 10 },
          type: node.type
        })
      }
    },
    deleteNode (state, action: PayloadAction<{ id: string }>) {
      const nodeIndex = state.nodes.findIndex(
        node => node.id === action.payload.id
      )
      state.nodes.splice(nodeIndex, 1)
    }
  }
})

export const {
  createNode,
  updateNode,
  updateNodeData,
  duplicateNode,
  deleteNode
} = nodeReducer.actions
export default nodeReducer.reducer
