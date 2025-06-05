import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'

      const HeaderLogo = () => {
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-earth-gradient rounded-lg flex items-center justify-center">
              <ApperIcon name="Sprout" size={20} className="text-white" />
            </div>
            <Text as="h1" className="text-xl lg:text-2xl font-bold text-surface-900">CropKeeper</Text>
          </div>
        )
      }

      export default HeaderLogo