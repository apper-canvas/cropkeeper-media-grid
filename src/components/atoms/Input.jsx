import React from 'react'

      const Input = ({ type, value, onChange, placeholder, required = false, className = '', step }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
            placeholder={placeholder}
            required={required}
            step={step}
          />
        )
      }

      export default Input