import { EdgeData } from '@/types/edge'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  MarkerType,
  getSimpleBezierPath
} from 'reactflow'
import EdgeWrapper from '../edge-wrapper'
import React from 'react'

function BezierEdge ({ ...props }: EdgeProps<EdgeData>) {
  const [path, labelX, labelY, offsetX, offsetY] = getSimpleBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition
  })

  console.log(props.markerStart, props.markerEnd)

  return (
    <>
      <>
        <EdgeWrapper {...props}>
          <path
            d={path}
            className='react-flow__edge-path'
            markerEnd={'url(#triangle)'}
            markerStart={'url(#triangle)'}
          />
        </EdgeWrapper>
        {props.data?.label ? (
          <EdgeLabelRenderer>
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
          </EdgeLabelRenderer>
        ) : null}
      </>
    </>
  )
}

export default BezierEdge
