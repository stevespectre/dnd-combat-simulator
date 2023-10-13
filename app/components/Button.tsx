import React from 'react'

type Props = {
  text: string,
  handleClick: () => void
}

function Button({ text, handleClick }: Props) {
  return (
    <button onClick={handleClick} className='bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded-md transition-all'>{text}</button>
  )
}

export default Button