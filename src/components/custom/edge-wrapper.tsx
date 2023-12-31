import { EdgeData, EdgeType } from '@/types/edge'
import { BaseEdge, Edge, EdgeProps, MarkerType } from 'reactflow'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '../ui/context-menu'
import { ReactNode, useCallback } from 'react'
import { useAppDispatch } from '@/hooks/redux-essentials'
import { updateEdgeProps } from '@/reducers/edge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import {
  ArrowRight,
  ArrowRightLeft,
  CornerUpRight,
  LucideIcon,
  MoveLeft,
  MoveRight,
  Pause,
  PauseCircle,
  Play,
  PlayCircle,
  Spline
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'

function PopoverContentItem ({
  children,
  ...props
}: { children?: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='p-2 rounded hover:bg-slate-100' {...props}>
      {children}
    </div>
  )
}

function PopoverContentSeparator ({
  align
}: {
  align: 'horizontal' | 'vertical'
}) {
  if (align === 'horizontal')
    return <div className='w-full h-px bg-slate-200'></div>
  if (align === 'vertical')
    return <div className='h-full w-px bg-slate-200'></div>
}

function EdgeWrapper ({
  children,
  className,
  wrapperStyle,
  ...props
}: {
  children?: ReactNode
  className?: string
  wrapperStyle?: React.CSSProperties
} & EdgeProps<EdgeData>) {
  const edgeCollectionList: {
    label: string
    type: EdgeType
    icon?: ReactNode
  }[] = [
    { label: 'Curved Edge', type: 'bezierEdge', icon: <Spline /> },
    { label: 'Step Edge', type: 'stepEdge', icon: <CornerUpRight /> }
  ]

  const dispatch = useAppDispatch()

  const handleEdgeTypeChange = useCallback((type: EdgeType) => {
    dispatch(
      updateEdgeProps({
        id: props.id,
        props: { type, data: { type } }
      })
    )
  }, [])

  const handleChangeProps = useCallback(
    (id: string, props: Partial<Edge<EdgeData>>) => {
      dispatch(updateEdgeProps({ id, props }))
    },
    []
  )
  console.log(props.markerStart)

  return (
    <>
      <Popover open={props.selected}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-1 flex items-center justify-start h-12 nopan',
            className
          )}
          style={{ pointerEvents: 'all', ...wrapperStyle }}
        >
          <PopoverContentItem
            onClick={() =>
              dispatch(
                updateEdgeProps({
                  id: props.id,
                  props: {
                    markerEnd: {
                      type: props.markerEnd
                        ? MarkerType.Arrow
                        : MarkerType.ArrowClosed,
                      width: 20,
                      height: 20,
                      color: '#FF0072'
                    }
                  }
                })
              )
            }
          >
            <MoveLeft />
          </PopoverContentItem>
          <PopoverContentItem
            onClick={() =>
              handleChangeProps(props.id, {
                markerStart: {
                  type: props.markerStart ? '' : MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: '#FF0072'
                }
              })
            }
          >
            <ArrowRightLeft />
          </PopoverContentItem>
          <PopoverContentItem>
            <MoveRight />
          </PopoverContentItem>
          <PopoverContentSeparator align='vertical' />
          {edgeCollectionList.map(item => (
            <PopoverContentItem
              key={item.type}
              onClick={() => handleEdgeTypeChange(item.type)}
            >
              {item.icon}
            </PopoverContentItem>
          ))}
          <PopoverContentSeparator align='vertical' />
          <PopoverContentItem
            onClick={() =>
              handleChangeProps(props.id, { animated: !props.animated })
            }
          >
            {props.animated ? <PauseCircle /> : <PlayCircle />}
          </PopoverContentItem>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default EdgeWrapper
