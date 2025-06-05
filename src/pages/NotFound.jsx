import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <ApperIcon name="MapPin" size={48} className="text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold text-surface-900 mb-4">Lost in the Fields?</h1>
        <p className="text-surface-600 mb-8 leading-relaxed">
          Looks like this page wandered off the farm! Let's get you back to your crops and livestock.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          <ApperIcon name="Home" size={20} />
          <span>Return to Farm</span>
        </Link>
        
        <div className="mt-12 text-sm text-surface-500">
          <p>Error 404 - Page not found</p>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound