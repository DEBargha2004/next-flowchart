import { EdgeData, EdgeType } from '@/types/edge'
import { BaseEdge, EdgeProps } from 'reactflow'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '../ui/context-menu'
import { ReactNode, useCallback } from 'react'
import { useAppDispatch } from '@/hooks/redux-essentials'
import { updateEdgeProps } from '@/reducers/edge'

function EdgeWrapper ({
  children,
  ...props
}: { children: ReactNode } & EdgeProps<EdgeData>) {
  const edgeType: EdgeType[] = ['bezierEdge', 'stepEdge']

  const dispatch = useAppDispatch()

  const handleEdgeTypeChange = useCallback((type: string) => {
    console.log(type)

    dispatch(
      updateEdgeProps({
        id: props.id,
        props: { type }
      })
    )
  }, [])

  console.log('props are ', props)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className='z-50'>
          {edgeType.map(type => {
            return (
              <ContextMenuItem
                key={type}
                onClick={() => {
                  handleEdgeTypeChange(type)
                }}
              >
                {}
                {type}
              </ContextMenuItem>
            )
          })}
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}

export default EdgeWrapper
