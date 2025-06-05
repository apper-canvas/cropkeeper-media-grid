import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'

      const QuickAddButton = ({ onClick }) => {
        return (
          <Button onClick={onClick} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2">
            <ApperIcon name="Plus" size={16} />
            <span className="hidden sm:inline">Quick Add</span>
          </Button>
        )
      }

      export default QuickAddButton