import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'

      const FeaturePlaceholder = ({ title, subtitle, description, iconName }) => {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-96 text-center p-8"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ApperIcon name={iconName} size={40} className="text-primary" />
            </div>
            <Text as="h3" className="text-2xl font-semibold text-surface-900 mb-3">{title}</Text>
            <Text as="p" className="text-lg text-primary font-medium mb-4">{subtitle}</Text>
            <Text as="p" className="text-surface-600 max-w-md leading-relaxed">{description}</Text>
            <div className="mt-6 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
              <Text as="span" className="text-sm text-primary font-medium">Coming in Version 2.0</Text>
            </div>
          </motion.div>
        )
      }

      export default FeaturePlaceholder