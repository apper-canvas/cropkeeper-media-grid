import React from 'react'

      const Spinner = ({ size = 'w-4 h-4', border = 'border-2', color = 'border-white', tColor = 'border-t-transparent' }) => {
        return (
          <div className={`${size} ${border} ${color} ${tColor} rounded-full animate-spin`}></div>
        )
      }

      export default Spinner