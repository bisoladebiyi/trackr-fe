import React from "react";

const Input = ({
  type = "text",
  options,
  value,
  onChange,
  required,
  label,
  inputID,
  placeholder,
  className,
  name
}) => {
  if (type === "select") {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={inputID}
          className="mb-2 text-sm font-semibold text-blue-950 capitalize"
        >
          {label}
        </label>
        <select
          onChange={onChange}
          value={value}
          required={required}
          id={inputID}
          placeholder={placeholder}
          className={`border outline-none rounded-md shadow-sm border-gray-300 p-3 text-sm ${className}`}
        >
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputID}
        className="mb-2 text-sm font-semibold text-blue-950 capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        id={inputID}
        placeholder={placeholder}
        name={name}
        className={`border outline-none rounded-md shadow-sm border-gray-300 p-3 text-sm ${className}`}
      />
    </div>
  );
};

export default Input;
