import React from 'react'


export default function Header({label}) {
  return (
    <div className='p-4 text-center'>
        <h1 className={`font-sans text-4xl font-normal tracking-[0.25em] dark:text-neutral-300`}>
          {label}
        </h1>
    </div>
  )
}
