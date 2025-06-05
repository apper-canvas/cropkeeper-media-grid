import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const NavItem = ({ item, isActive, onClick }) => {
        return (
          <Button
            key={item.id}
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
              isActive && item.active
                ? 'bg-primary text-white'
                : item.active
                ? 'text-surface-700 hover:bg-surface-100'
                : 'text-surface-400 cursor-not-allowed'
            }`}
            disabled={!item.active}
          >
            <ApperIcon name={item.icon} size={20} />
            <Text as="span" className="font-medium">{item.label}</Text>
            {!item.active && (
              <Text as="span" className="ml-auto text-xs bg-surface-200 px-2 py-1 rounded">Soon</Text>
            )}
          </Button>
        )
      }

      export default NavItem