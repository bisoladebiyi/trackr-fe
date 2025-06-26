import React from 'react'

const Button = ({ text, onClick, className, type="button", disabled}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`bg-primary text-white text-sm rounded-md p-3 cursor-pointer hover:opacity-90 transition-all font-semibold ${className} disabled:cursor-not-allowed disabled:opacity-75`}>{text}</button>
  )
}

export default Button