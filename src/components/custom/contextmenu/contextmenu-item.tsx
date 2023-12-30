import React, { HTMLAttributes } from 'react'

const CustomContextMenuItem = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className='hover:bg-slate-200 p-1 h-8 rounded' {...props}>
      {children}
    </div>
  )
})

export default CustomContextMenuItem
