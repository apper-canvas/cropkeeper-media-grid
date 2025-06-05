import React, { useState } from 'react'
      import { toast } from 'react-toastify'
      import SectionHeader from '@/components/organisms/SectionHeader'
      import Sidebar from '@/components/organisms/Sidebar'
      import { motion, AnimatePresence } from 'framer-motion'
      import Spinner from '@/components/atoms/Spinner'
      import Text from '@/components/atoms/Text'

      const DashboardTemplate = ({ 
        children, 
        menuItems, 
        activeTab, 
        setActiveTab, 
        weather, 
        isLoading 
      }) => {
        const [sidebarOpen, setSidebarOpen] = useState(false)

        const handleTabClick = (item) => {
          if (item.active) {
            setActiveTab(item.id)
            setSidebarOpen(false)
          } else {
            toast.info(`${item.label} feature coming soon!`)
          }
        }

        if (isLoading) {
          return (
            <div className="min-h-screen bg-surface-50 flex items-center justify-center">
              <div className="text-center">
                <Spinner size="w-16 h-16" border="border-4" color="border-primary" />
                <Text as="p" className="text-surface-600">Loading your farm data...</Text>
              </div>
            </div>
          )
        }

        return (
          <div className="min-h-screen bg-surface-50">
            <SectionHeader
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              weather={weather}
              onQuickAdd={() => toast.info("Quick Add coming soon!")}
            />

            <div className="flex">
              <Sidebar
                isOpen={sidebarOpen}
                menuItems={menuItems}
                activeTab={activeTab}
                onTabClick={handleTabClick}
              />

              <main className="flex-1 p-4 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>

            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        )
      }

      export default DashboardTemplate