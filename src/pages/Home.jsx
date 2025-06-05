import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import farmService from '../services/api/farmService'
import cropService from '../services/api/cropService'
import taskService from '../services/api/taskService'
import expenseService from '../services/api/expenseService'
import weatherService from '../services/api/weatherService'

const Home = () => {
  const [farms, setFarms] = useState([])
  const [crops, setCrops] = useState([])
  const [tasks, setTasks] = useState([])
  const [expenses, setExpenses] = useState([])
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      try {
        const [farmsData, cropsData, tasksData, expensesData, weatherData] = await Promise.all([
          farmService.getAll(),
          cropService.getAll(),
          taskService.getAll(),
          expenseService.getAll(),
          weatherService.getAll()
        ])
        
        setFarms(farmsData || [])
        setCrops(cropsData || [])
        setTasks(tasksData || [])
        setExpenses(expensesData || [])
        setWeather(weatherData?.[0] || null)
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load farm data")
      } finally {
        setLoading(false)
      }
    }
    
    loadAllData()
  }, [])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', active: true },
    { id: 'farms', label: 'My Farms', icon: 'MapPin', active: true },
    { id: 'crops', label: 'Crops', icon: 'Sprout', active: true },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', active: true },
    { id: 'expenses', label: 'Expenses', icon: 'DollarSign', active: true },
    { id: 'revenue', label: 'Revenue', icon: 'TrendingUp', active: false },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', active: false },
    { id: 'inventory', label: 'Inventory', icon: 'Package', active: false },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar', active: false },
    { id: 'gallery', label: 'Gallery', icon: 'Camera', active: false },
    { id: 'settings', label: 'Settings', icon: 'Settings', active: true }
  ]

  const totalExpensesThisMonth = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date)
      const now = new Date()
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const upcomingTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate)
    const today = new Date()
    return taskDate >= today && task.status !== 'completed'
  }).slice(0, 3)

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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-96 text-center p-8"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name={placeholder.icon} size={40} className="text-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-surface-900 mb-3">{placeholder.title}</h3>
        <p className="text-lg text-primary font-medium mb-4">{placeholder.subtitle}</p>
        <p className="text-surface-600 max-w-md leading-relaxed">{placeholder.description}</p>
        <div className="mt-6 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
          <span className="text-sm text-primary font-medium">Coming in Version 2.0</span>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-surface-600">Loading your farm data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100"
            >
              <ApperIcon name="Menu" size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-earth-gradient rounded-lg flex items-center justify-center">
                <ApperIcon name="Sprout" size={20} className="text-white" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-surface-900">CropKeeper</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Weather Widget */}
            {weather && (
              <div className="hidden md:flex items-center space-x-3 bg-surface-100 rounded-lg px-4 py-2">
                <ApperIcon name="Sun" size={20} className="text-warning" />
                <div className="text-sm">
                  <span className="font-medium">{weather.currentTemp}°F</span>
                  <span className="text-surface-600 ml-2">{weather.conditions}</span>
                </div>
              </div>
            )}
            
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2">
              <ApperIcon name="Plus" size={16} />
              <span className="hidden sm:inline">Quick Add</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed lg:static inset-y-0 left-0 z-30 w-70 bg-white border-r border-surface-200 shadow-lg lg:shadow-none top-16 lg:top-0"
            >
              <div className="p-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.active) {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      } else {
                        toast.info(`${item.label} feature coming soon!`)
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id && item.active
                        ? 'bg-primary text-white'
                        : item.active
                        ? 'text-surface-700 hover:bg-surface-100'
                        : 'text-surface-400 cursor-not-allowed'
                    }`}
                    disabled={!item.active}
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
                    {!item.active && (
                      <span className="ml-auto text-xs bg-surface-200 px-2 py-1 rounded">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-surface-900 mb-2">
                      Farm Dashboard
                    </h2>
                    <p className="text-surface-600">Overview of your farming operations</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name="MapPin" size={24} className="text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-surface-900">{farms?.length || 0}</span>
                      </div>
                      <h3 className="font-semibold text-surface-900">Total Farms</h3>
                      <p className="text-sm text-surface-600 mt-1">Active farming locations</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-growth/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name="Sprout" size={24} className="text-growth" />
                        </div>
                        <span className="text-2xl font-bold text-surface-900">{crops?.length || 0}</span>
                      </div>
                      <h3 className="font-semibold text-surface-900">Active Crops</h3>
                      <p className="text-sm text-surface-600 mt-1">Currently growing</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name="Clock" size={24} className="text-warning" />
                        </div>
                        <span className="text-2xl font-bold text-surface-900">{upcomingTasks?.length || 0}</span>
                      </div>
                      <h3 className="font-semibold text-surface-900">Pending Tasks</h3>
                      <p className="text-sm text-surface-600 mt-1">Upcoming activities</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name="DollarSign" size={24} className="text-error" />
                        </div>
                        <span className="text-xl font-bold text-surface-900">${totalExpensesThisMonth.toFixed(2)}</span>
                      </div>
                      <h3 className="font-semibold text-surface-900">Monthly Expenses</h3>
                      <p className="text-sm text-surface-600 mt-1">This month's spending</p>
                    </div>
                  </div>

                  {/* Quick Actions & Weather */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold text-surface-900 mb-4">Recent Activity</h3>
                      <div className="bg-white rounded-xl p-6 shadow-card">
                        {upcomingTasks?.length > 0 ? (
                          <div className="space-y-4">
                            {upcomingTasks.map((task) => (
                              <div key={task.id} className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                                <div>
                                  <h4 className="font-medium text-surface-900">{task.title}</h4>
                                  <p className="text-sm text-surface-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  task.priority === 'high' ? 'bg-error/10 text-error' :
                                  task.priority === 'medium' ? 'bg-warning/10 text-warning' :
                                  'bg-growth/10 text-growth'
                                }`}>
                                  {task.priority}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <ApperIcon name="CheckCircle" size={48} className="text-surface-300 mx-auto mb-4" />
                            <p className="text-surface-600">No upcoming tasks. Great job staying on top of things!</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Weather Forecast */}
                    <div>
                      <h3 className="text-xl font-semibold text-surface-900 mb-4">Weather Forecast</h3>
                      <div className="bg-white rounded-xl p-6 shadow-card">
                        {weather ? (
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <ApperIcon name="Sun" size={32} className="text-warning" />
                              </div>
                              <div className="text-3xl font-bold text-surface-900">{weather.currentTemp}°F</div>
                              <div className="text-surface-600">{weather.conditions}</div>
                              <div className="text-sm text-surface-500 mt-2">Humidity: {weather.humidity}%</div>
                            </div>
                            
                            {weather.forecast && weather.forecast.length > 0 && (
                              <div className="border-t border-surface-200 pt-4">
                                <h4 className="text-sm font-medium text-surface-900 mb-3">5-Day Forecast</h4>
                                <div className="space-y-2">
                                  {weather.forecast.slice(0, 5).map((day, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                      <span className="text-surface-600">{day.day}</span>
                                      <div className="flex items-center space-x-2">
                                        <ApperIcon name={day.icon} size={16} className="text-warning" />
                                        <span className="text-surface-900">{day.high}°/{day.low}°</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-3 skeleton"></div>
                            <p className="text-surface-600">Loading weather data...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'farms' && (
                <MainFeature 
                  type="farms" 
                  farms={farms} 
                  setFarms={setFarms}
                />
              )}

              {activeTab === 'crops' && (
                <MainFeature 
                  type="crops" 
                  crops={crops} 
                  setCrops={setCrops}
                  farms={farms}
                />
              )}

              {activeTab === 'tasks' && (
                <MainFeature 
                  type="tasks" 
                  tasks={tasks} 
                  setTasks={setTasks}
                  farms={farms}
                  crops={crops}
                />
              )}

              {activeTab === 'expenses' && (
                <MainFeature 
                  type="expenses" 
                  expenses={expenses} 
                  setExpenses={setExpenses}
                  farms={farms}
                />
              )}

              {['revenue', 'reports', 'inventory', 'calendar', 'gallery'].includes(activeTab) && (
                renderPlaceholderContent(activeTab)
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-surface-900 mb-6">Settings</h2>
                  <div className="bg-white rounded-xl p-6 shadow-card">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-surface-900 mb-2">
                          Default Units
                        </label>
                        <select className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                          <option>Imperial (acres, °F)</option>
                          <option>Metric (hectares, °C)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-surface-900 mb-2">
                          Time Zone
                        </label>
                        <select className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Pacific Time (PT)</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
                          <span className="text-surface-900">Enable weather alerts</span>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
                          <span className="text-surface-900">Send task reminders</span>
                        </label>
                      </div>

                      <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark font-medium">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Home