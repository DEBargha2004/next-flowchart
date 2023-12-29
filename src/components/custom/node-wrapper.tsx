import { useAppDispatch, useAppState } from '@/hooks/redux-essentials'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { deleteNode, duplicateNode, updateNodeData } from '@/reducers/node'
import { useCallback, useRef, useState } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '../ui/context-menu'
import { NodeData } from '@/types/node'
import { NodeProps, NodeResizer, OnResize, ResizeDragEvent } from 'reactflow'

const colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple']

function NodeWrapper ({
  children,
  id,
  data,
  includeInput,
  ...props
}: {
  children: React.ReactNode
  id: string
  data: NodeData
  includeInput?: boolean
} & NodeProps<NodeData>) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const node = useAppState(state =>
    state.nodes.nodes.find(node => node.id === id)
  )
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleColorChange = useCallback((color: string) => {
    dispatch(updateNodeData({ id, data: { color: color } }))
  }, [])

  const handleCreateDuplicate = useCallback((id: string) => {
    dispatch(duplicateNode({ id }))
  }, [])

  const handleDeleteNode = useCallback((id: string) => {
    dispatch(deleteNode({ id }))
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // dispatch(updateNodeData({ id, data: { label: e.target.value } }))
      console.log(inputRef.current?.innerText)
    },
    []
  )

  const handleResize: OnResize = useCallback(e => {
    if (node) {
      dispatch(
        updateNodeData({
          id,
          data: {
            height: node?.data.height + e.dy,
            width: node?.data.width + e.dx
          }
        })
      )
    }
  }, [])

  return (
    <>
      <div
        onDoubleClick={() => setOpen(true)}
        onClick={() => setOpen(false)}
        style={{ height: data.height, width: data.width }}
        className='relative'
      >
        <HoverCard openDelay={200} open={open}>
          <HoverCardTrigger>
            <ContextMenu>
              <ContextMenuTrigger>
                <div style={{ height: data.height, width: data.width }}>
                  {children}
                  {includeInput ? (
                    <textarea
                      ref={inputRef}
                      contentEditable
                      onChange={handleInputChange}
                      className='w-fit h-[90%] absolute text-center top-1/2 left-1/2 bg-transparent resize-none border-none outline-none -translate-x-1/2 -translate-y-1/2 leading-4 overflow-hidden'
                    ></textarea>
                  ) : null}
                  <NodeResizer isVisible={props.selected} />
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  inset
                  onClick={() => handleCreateDuplicate(id)}
                >
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem inset onClick={() => handleDeleteNode(id)}>
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </HoverCardTrigger>
          <HoverCardContent className='w-fit'>
            <div className='flex gap-2'>
              {colors.map(color => (
                <div
                  className='h-5 w-5 cursor-pointer rounded-full'
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  key={color}
                ></div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  )
}

export default NodeWrapper
