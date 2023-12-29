import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { applyEdgeChanges, Edge, EdgeChange } from 'reactflow'
import { type PayloadEdgeData } from '@/types/edge'

const initialState: Edge[] = []

const edgeReducer = createSlice({
  name: 'edge',
  initialState,
  reducers: {
    createEdge (state, action: PayloadAction<Edge>) {
      state.push(action.payload)
    },
    updateEdge (state, action: PayloadAction<EdgeChange[]>) {
      applyEdgeChanges(action.payload, state)
    },
    deleteEdge (state, action: PayloadAction<{ id: string }>) {
      const edgeIndex = state.findIndex(edge => edge.id === action.payload.id)
      state.splice(edgeIndex, 1)
    }
  }
})

export default edgeReducer.reducer

export const { createEdge, updateEdge, deleteEdge } = edgeReducer.actions
