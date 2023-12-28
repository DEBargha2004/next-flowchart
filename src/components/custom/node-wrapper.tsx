import { useAppDispatch } from '@/hooks/redux-essentials'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { updateNode } from '@/reducers/node'
import { useState } from 'react'

function NodeWrapper ({
  children,
  id,
  height,
  width
}: {
  children: React.ReactNode
  id: string
  height: number
  width: number
}) {
  const [open, setOpen] = useState(false)

  const colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple']
  const dispatch = useAppDispatch()

  const handleColorChange = (color: string) => {
    dispatch(updateNode({ id, data: { color: color } }))
  }
  return (
    <>
      <div
        onDoubleClick={() => setOpen(true)}
        onClick={() => setOpen(false)}
        style={{ height, width }}
        className='relative'
      >
        <HoverCard openDelay={200} open={open}>
          <HoverCardTrigger>{children}</HoverCardTrigger>
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
