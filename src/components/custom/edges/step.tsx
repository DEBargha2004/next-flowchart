import { EdgeData, EdgeType } from '@/types/edge'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  EdgeText,
  MarkerType,
  getSmoothStepPath
} from 'reactflow'
import EdgeWrapper from '../edge-wrapper'
import CustomBaseEdge from './base-edge'

function StepEdge ({ ...props }: EdgeProps<EdgeData>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition
  })
  console.log('path is ', path)

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
      </>
    </>
  )
}

export default StepEdge
