import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import HeaderLogo from '@/components/molecules/HeaderLogo'
      import QuickAddButton from '@/components/molecules/QuickAddButton'
      import Text from '@/components/atoms/Text'

      const SectionHeader = ({ onMenuToggle, weather, onQuickAdd }) => {
        return (
          <header className="bg-white border-b border-surface-200 shadow-sm sticky top-0 z-40">
            <div className="container flex items-center justify-between h-16 lg:h-20">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onMenuToggle}
                  className="lg:hidden p-2 rounded-lg hover:bg-surface-100"
                >
                  <ApperIcon name="Menu" size={24} />
                </button>
                <HeaderLogo />
              </div>

              <div className="flex items-center space-x-4">
                {weather && (
                  <div className="hidden md:flex items-center space-x-3 bg-surface-100 rounded-lg px-4 py-2">
                    <ApperIcon name="Sun" size={20} className="text-warning" />
                    <div className="text-sm">
                      <Text as="span" className="font-medium">{weather.currentTemp}°F</Text>
                      <Text as="span" className="text-surface-600 ml-2">{weather.conditions}</Text>
                    </div>
                  </div>
                )}
                
                <QuickAddButton onClick={onQuickAdd} />
              </div>
            </div>
          </header>
        )
      }

      export default SectionHeader