import { EdgeData } from '@/types/edge'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath
} from 'reactflow'
import EdgeWrapper from '../edge-wrapper'

function StepEdge ({ ...props }: EdgeProps<EdgeData>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition
  })
  return (
    // <EdgeWrapper {...props}>
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
  )
}

export default StepEdge
