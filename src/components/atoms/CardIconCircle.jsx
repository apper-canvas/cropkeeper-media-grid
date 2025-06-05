import React from 'react'
      import ApperIcon from '@/components/ApperIcon'

      const CardIconCircle = ({ iconName, bgColorClass, iconColorClass, size = 24 }) => {
        return (
          <div className={`w-12 h-12 ${bgColorClass} rounded-lg flex items-center justify-center`}>
            <ApperIcon name={iconName} size={size} className={iconColorClass} />
          </div>
        )
      }

      export default CardIconCircle