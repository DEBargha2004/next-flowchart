import { useAppDispatch, useAppState } from '@/hooks/redux-essentials'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { useViewport } from 'reactflow'
import { createNode } from '@/reducers/node'
import { NodeType } from '@/types/node'
import {
  EllipseSVG,
  HexagonSVG,
  RectangleSVG,
  RoundRectangleSVG,
  DiamondSVG,
  PentagonSVG,
  CylinderSVG,
  TriangleSVG,
  ParallelogramSVG,
  PlusSVG
} from './shapes'

const strokeColor: string = 'rgba(255, 255, 255, 0.5)'
const strokeWidth: number = 2
type Position =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

function bucketPosition (position: Position) {
  switch (position) {
    case 'left':
      return 'left-0 top-1/2 -translate-y-1/2'

    case 'right':
      return 'right-0 top-1/2 -translate-y-1/2'

    case 'top':
      return 'top-0 left-1/2 -translate-x-1/2'
    case 'bottom':
      return 'bottom-0 left-1/2 -translate-x-1/2'
    case 'top-left':
      return 'top-0 left-0'
    case 'top-right':
      return 'top-0 right-0'
    case 'bottom-left':
      return 'bottom-0 left-0'
    case 'bottom-right':
      return 'bottom-0 right-0'
  }
}

function ShapeOverviewWrapper ({
  children,
  type
}: {
  children: ReactNode
  type: NodeType
}) {
  const dispatch = useAppDispatch()
  const windowDimension = useAppState(state => state.windowState)
  const { x, y } = useViewport()

  return (
    <div
      className='w-fit cursor-pointer rounded p-1 transition-all hover:bg-slate-800'
      onClick={e => {
        dispatch(
          createNode({
            id: crypto.randomUUID(),
            data: { color: 'red', height: 150, width: 150, label: '' },
            position: {
              x: windowDimension.w / 2 - x,
              y: windowDimension.h / 2 - y
            },
            type
          })
        )
      }}
    >
      {children}
    </div>
  )
}

function Row ({ children }: { children: ReactNode }) {
  return <div className='flex items-center gap-1'>{children}</div>
}
function ShapesBucket ({ position }: { position: Position }) {
  return (
    <div
      className={cn(
        'absolute m-2 w-fit rounded bg-slate-600 px-1 py-2',
        bucketPosition(position)
      )}
    >
      <Row>
        <ShapeOverviewWrapper type='ellipseNode'>
          <EllipseSVG
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            height={50}
            width={50}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='roundedRectangleNode'>
          <RoundRectangleSVG
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            height={50}
            width={50}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='rectangleNode'>
          <RectangleSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='hexagonNode'>
          <HexagonSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
      </Row>
      <Row>
        <ShapeOverviewWrapper type='diamondNode'>
          <DiamondSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='pentagonNode'>
          <PentagonSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='cylinderNode'>
          <CylinderSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='triangleNode'>
          <TriangleSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
      </Row>
      <Row>
        <ShapeOverviewWrapper type='parallelogramNode'>
          <ParallelogramSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
        <ShapeOverviewWrapper type='plusNode'>
          <PlusSVG
            height={50}
            width={50}
            fill='transparent'
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </ShapeOverviewWrapper>
      </Row>
    </div>
  )
}

export default ShapesBucket
