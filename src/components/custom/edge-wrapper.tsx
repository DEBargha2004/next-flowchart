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

function EdgeWrapper ({
  children,
  ...props
}: { children: ReactNode } & EdgeProps<EdgeData>) {
  const edgeType: EdgeType[] = ['bezierEdge', 'stepEdge']

  const dispatch = useAppDispatch()

  const handleChangeEdgeType = useCallback((type: EdgeType) => {}, [])
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {edgeType.map(type => {
            return (
              <ContextMenuItem
                key={type}
                onClick={() => {
                  handleChangeEdgeType(type)
                }}
              >
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
