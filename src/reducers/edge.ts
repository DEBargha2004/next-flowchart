import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  applyEdgeChanges,
  Connection,
  Edge,
  EdgeChange,
  EdgeProps,
  updateEdge as updateEdge_reactflow
} from 'reactflow'
import { EdgeData, EdgeType } from '@/types/edge'

const initialState: { edges: Edge<EdgeData>[] } = { edges: [] }

const edgeReducer = createSlice({
  name: 'edge',
  initialState,
  reducers: {
    createEdge (state, action: PayloadAction<Edge<EdgeData>>) {
      state.edges.push(action.payload)
    },
    updateEdge (state, action: PayloadAction<EdgeChange[]>) {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    updateEdgeProps (
      state,
      action: PayloadAction<{ id: string; props: Partial<Edge<EdgeData>> }>
    ) {
      const edgeIndex = state.edges.findIndex(
        edge => edge.id === action.payload.id
      )
      if (edgeIndex !== -1) {
        state.edges[edgeIndex] = {
          ...state.edges[edgeIndex],
          ...action.payload.props
        }
      }
    },
    updateConnection (
      state,
      action: PayloadAction<{ id: string; connection: Connection }>
    ) {
      if (
        action.payload.connection.source &&
        action.payload.connection.target
      ) {
        const old_edge = state.edges.find(edge => edge.id === action.payload.id)
        if (old_edge) {
          state.edges = updateEdge_reactflow(
            old_edge,
            action.payload.connection,
            state.edges
          )
        }
      }
    },
    deleteEdge (state, action: PayloadAction<{ id: string }>) {
      const edgeIndex = state.edges.findIndex(
        edge => edge.id === action.payload.id
      )
      state.edges.splice(edgeIndex, 1)
    }
  }
})

export default edgeReducer.reducer

export const {
  createEdge,
  updateEdge,
  deleteEdge,
  updateEdgeProps,
  updateConnection
} = edgeReducer.actions
