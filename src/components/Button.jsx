import React from 'react'

const Button = ({ text, onClick, className, type="button"}) => {
  return (
    <button type={type} onClick={onClick} className={`bg-primary text-white text-sm rounded-md p-3 cursor-pointer hover:opacity-90 transition-all font-semibold ${className}`}>{text}</button>
  )
}

export default Button