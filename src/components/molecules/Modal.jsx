import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import Spinner from '@/components/atoms/Spinner'

      const Modal = ({ isOpen, onClose, title, onSubmit, children, isLoading, submitText, isEditing }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Text as="h3" className="text-xl font-semibold text-surface-900">
                      {title}
                    </Text>
                    <Button
                      onClick={onClose}
                      className="p-2 text-surface-400 hover:text-surface-600"
                    >
                      <ApperIcon name="X" size={20} />
                    </Button>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-6">
                    {children}

                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 font-medium"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 font-medium flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <Spinner />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>{submitText || (isEditing ? 'Update' : 'Create')}</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }

      export default Modal