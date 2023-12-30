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
      <>
        <BaseEdge id={props.id} path={path} />
        <EdgeLabelRenderer>
          <EdgeWrapper {...props}>
            <div
              style={{
                position: 'absolute',
                transform: `translate(${labelX}px,${labelY}px) translate(-50%,-50%)`,
                pointerEvents: 'all'
              }}
              className='nopan'
            >
              <p className='text-sm bg-white rounded shadow px-2 py-1'>
                {props.data?.label}
              </p>
            </div>
          </EdgeWrapper>
        </EdgeLabelRenderer>
      </>
      {/* </EdgeWrapper> */}
    </React.Fragment>
  )
}

export default BezierEdge
