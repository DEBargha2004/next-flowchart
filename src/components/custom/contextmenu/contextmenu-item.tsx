import React from 'react'

function CustomContextMenuItem ({ children }: { children: React.ReactNode }) {
  return <div className='hover:bg-slate-200 p-1 h-8 rounded'>{children}</div>
}

export default CustomContextMenuItem
