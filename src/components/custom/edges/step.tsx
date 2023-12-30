import { EdgeData } from '@/types/edge'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath
} from 'reactflow'

function StepEdge ({ data, id, ...props }: EdgeProps<EdgeData>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition
  })
  return (
    <>
      <BaseEdge id={id} path={path} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(${labelX}px,${labelY}px) translate(-50%,-50%)`
          }}
        >
          <p>{data?.label}</p>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default StepEdge
