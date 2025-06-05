import React, { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import farmService from '@/services/api/farmService'
      import cropService from '@/services/api/cropService'
      import taskService from '@/services/api/taskService'
      import expenseService from '@/services/api/expenseService'
      import weatherService from '@/services/api/weatherService'

      import DashboardTemplate from '@/components/templates/DashboardTemplate'
      import FeatureTemplate from '@/components/templates/FeatureTemplate'
      import DashboardOverview from '@/components/organisms/DashboardOverview'
      import FeaturePlaceholder from '@/components/molecules/FeaturePlaceholder'
      import SettingsForm from '@/components/organisms/SettingsForm'

      const HomePage = () => {
        const [farms, setFarms] = useState([])
        const [crops, setCrops] = useState([])
        const [tasks, setTasks] = useState([])
        const [expenses, setExpenses] = useState([])
        const [weather, setWeather] = useState(null)
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const [activeTab, setActiveTab] = useState('dashboard')
const renderPlaceholderContent = (type) => {
        const placeholders = {
          revenue: {
            title: "Track Your Income",
            subtitle: "Start tracking your harvest income soon",
            description: "Revenue tracking feature is coming soon! You'll be able to record sales, track profit margins, and see detailed income analytics.",
            icon: "TrendingUp"
          },
          reports: {
            title: "Advanced Analytics",
            subtitle: "Financial analytics launching next month",
            description: "Get detailed insights into your farm performance with comprehensive reports and data visualization.",
            icon: "BarChart3"
          },
          inventory: {
            title: "Inventory Management",
            subtitle: "Track your supplies and equipment - Coming soon",
            description: "Manage seeds, fertilizers, tools, and equipment with automatic low-stock alerts.",
            icon: "Package"
          },
          calendar: {
            title: "Calendar View",
            subtitle: "See all your tasks in calendar format - Coming soon",
            description: "View all your farming activities in a beautiful calendar interface with drag-and-drop scheduling.",
            icon: "Calendar"
          },
          gallery: {
            title: "Photo Documentation",
            subtitle: "Photo documentation coming soon",
            description: "Capture and organize photos of your crops, farm progress, and important moments throughout the season.",
            icon: "Camera"
          }
        }

        const placeholder = placeholders[type]
        if (!placeholder) return null

        return (
          <FeaturePlaceholder
            title={placeholder.title}
            subtitle={placeholder.subtitle}
            description={placeholder.description}
            iconName={placeholder.icon}
          />
        )
      }
return (
        <DashboardTemplate
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          weather={weather}
          isLoading={loading}
        >
          {activeTab === 'dashboard' && (
            <DashboardOverview
              farms={farms}
              crops={crops}
              upcomingTasks={upcomingTasks}
              totalExpensesThisMonth={totalExpensesThisMonth}
              weather={weather}
            />
          )}

          {activeTab === 'farms' && (
            <FeatureTemplate 
              type="farms" 
              data={farms} 
              setData={setFarms}
              allCrops={crops} // Farms need crops to calculate active crops
            />
          )}

          {activeTab === 'crops' && (
            <FeatureTemplate 
              type="crops" 
              data={crops} 
              setData={setCrops}
              allFarms={farms} // Crops need farms for selection
            />
          )}

          {activeTab === 'tasks' && (
            <FeatureTemplate 
              type="tasks" 
              data={tasks} 
              setData={setTasks}
              allFarms={farms} // Tasks need farms for selection
              allCrops={crops} // Tasks need crops for selection
            />
          )}

          {activeTab === 'expenses' && (
            <FeatureTemplate 
              type="expenses" 
              data={expenses} 
              setData={setExpenses}
              allFarms={farms} // Expenses need farms for selection
            />
          )}

          {['revenue', 'reports', 'inventory', 'calendar', 'gallery'].includes(activeTab) && (
            renderPlaceholderContent(activeTab)
          )}

          {activeTab === 'settings' && (
            <SettingsForm />
          )}
        </DashboardTemplate>
      )
    }
export default HomePage