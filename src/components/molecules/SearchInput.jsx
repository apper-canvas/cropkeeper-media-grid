import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Input from '@/components/atoms/Input'

      const SearchInput = ({ searchTerm, onSearchChange, placeholder = 'Search...' }) => {
        return (
          <div className="relative flex-1">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        )
      }

      export default SearchInput