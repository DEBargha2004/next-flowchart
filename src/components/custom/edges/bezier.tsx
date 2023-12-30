import { EdgeData } from '@/types/edge'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath
} from 'reactflow'
import EdgeWrapper from '../edge-wrapper'
import React from 'react'

function BezierEdge ({ ...props }: EdgeProps<EdgeData>) {
  const [path, labelX, labelY] = getSimpleBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition
  })
  return (
    <React.Fragment key={props.id}>
      <BaseEdge id={props.id} path={path} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(${labelX}px,${labelY}px) translate(-50%,-50%)`
          }}
        >
          <EdgeWrapper {...props} key={props.id}>
            <p className='bg-white p-1 rounded inset-1 border border-slate-500'>
              {props.data?.label}
            </p>
          </EdgeWrapper>
        </div>
      </EdgeLabelRenderer>
    </React.Fragment>
  )
}

export default BezierEdge
