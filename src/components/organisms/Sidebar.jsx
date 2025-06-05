import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import NavItem from '@/components/molecules/NavItem'

      const Sidebar = ({ isOpen, menuItems, activeTab, onTabClick }) => {
        return (
          <AnimatePresence>
            {(isOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="fixed lg:static inset-y-0 left-0 z-30 w-70 bg-white border-r border-surface-200 shadow-lg lg:shadow-none top-16 lg:top-0"
              >
                <div className="p-6 space-y-2">
                  {menuItems.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isActive={activeTab === item.id}
                      onClick={() => onTabClick(item)}
                    />
                  ))}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        )
      }

      export default Sidebar