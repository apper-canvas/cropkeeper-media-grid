import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', layout = true }) => {
        return (
          <motion.div
            layout={layout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-xl p-6 shadow-card hover:shadow-farm transition-all duration-200 ${className}`}
          >
            {children}
          </motion.div>
        )
      }

      export default Card