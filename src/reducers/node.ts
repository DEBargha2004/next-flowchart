import {
  CreatePayloadNodeData,
  UpdatePayloadNodeData,
  type PayloadNodeData
} from '@/types/node'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CreatePayloadNodeData[] = []

const nodeReducer = createSlice({
  initialState,
  name: 'node',
  reducers: {
    createNode (state, action: PayloadAction<CreatePayloadNodeData>) {
      state.push(action.payload)
    },
    updateNode (state, action: PayloadAction<UpdatePayloadNodeData>) {
      const selectedNode = state.find(node => node.id === action.payload.id)
      if (selectedNode) {
        selectedNode.position = action.payload.position ?? selectedNode.position
        selectedNode.type = action.payload.type ?? selectedNode.type
        if (selectedNode.data) {
          selectedNode.data.color =
            action.payload.data?.color ?? selectedNode.data.color
          selectedNode.data.label =
            action.payload.data?.label ?? selectedNode.data.label
        }
      }
    }
  }
})

export const { createNode, updateNode } = nodeReducer.actions
export default nodeReducer.reducer
