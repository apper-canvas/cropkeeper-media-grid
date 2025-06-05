import React, { useState } from 'react'
      import { toast } from 'react-toastify'
      import { AnimatePresence, motion } from 'framer-motion'

      import farmService from '@/services/api/farmService'
      import cropService from '@/services/api/cropService'
      import taskService from '@/services/api/taskService'
      import expenseService from '@/services/api/expenseService'

      import Modal from '@/components/molecules/Modal'
      import SearchInput from '@/components/molecules/SearchInput'
      import Button from '@/components/atoms/Button'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'

      import FarmList from '@/components/organisms/FarmList'
      import FarmForm from '@/components/organisms/FarmForm'
      import CropList from '@/components/organisms/CropList'
      import CropForm from '@/components/organisms/CropForm'
      import TaskList from '@/components/organisms/TaskList'
      import TaskForm from '@/components/organisms/TaskForm'
      import ExpenseList from '@/components/organisms/ExpenseList'
      import ExpenseForm from '@/components/organisms/ExpenseForm'

      const MainContentSection = ({ type, data, setData, allFarms, allCrops }) => {
        const [showModal, setShowModal] = useState(false)
        const [editingItem, setEditingItem] = useState(null)
        const [formData, setFormData] = useState({})
        const [loading, setLoading] = useState(false)
        const [searchTerm, setSearchTerm] = useState('')
        const [filterStatus, setFilterStatus] = useState('all')

        const titleMapping = {
          farms: 'Farm Management',
          crops: 'Crop Tracking',
          tasks: 'Task Management', 
          expenses: 'Expense Tracking'
        }

        const descriptionMapping = {
          farms: 'Manage your farming locations and properties',
          crops: 'Track your crop planting and growth progress',
          tasks: 'Organize and monitor your farming activities',
          expenses: 'Keep track of your farm-related expenses'
        }

        const iconMapping = {
          farms: 'MapPin',
          crops: 'Sprout',
          tasks: 'CheckSquare',
          expenses: 'DollarSign'
        }

        const resetForm = () => {
          const defaults = {
            farms: { name: '', location: '', size: '', sizeUnit: 'acres', soilType: 'loam' },
            crops: { farmId: '', cropType: '', plantingDate: '', expectedHarvestDate: '', growthStage: 'planted', area: '', notes: '' },
            tasks: { farmId: '', cropId: '', title: '', description: '', dueDate: '', priority: 'medium', status: 'pending' },
            expenses: { farmId: '', date: '', amount: '', category: 'seeds', description: '', paymentMethod: 'cash' }
          }
          setFormData(defaults[type] || {})
          setEditingItem(null)
        }

        const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)

          try {
            const services = {
              farms: farmService,
              crops: cropService,
              tasks: taskService,
              expenses: expenseService
            }

            const service = services[type]
            let result

            if (editingItem) {
              result = await service.update(editingItem.id, formData)
              setData(prevData => prevData.map(item => item.id === editingItem.id ? result : item))
              toast.success(`${type.slice(0, -1)} updated successfully!`)
            } else {
              result = await service.create(formData)
              setData(prevData => [...prevData, result])
              toast.success(`${type.slice(0, -1)} created successfully!`)
            }

            setShowModal(false)
            resetForm()
          } catch (error) {
            toast.error(error.message)
          } finally {
            setLoading(false)
          }
        }

        const handleDelete = async (id) => {
          if (!window.confirm('Are you sure you want to delete this item?')) return

          setLoading(true)
          try {
            const services = {
              farms: farmService,
              crops: cropService,
              tasks: taskService,
              expenses: expenseService
            }

            await services[type].delete(id)
            setData(prevData => prevData.filter(item => item.id !== id))
            toast.success(`${type.slice(0, -1)} deleted successfully!`)
          } catch (error) {
            toast.error(error.message)
          } finally {
            setLoading(false)
          }
        }

        const handleEdit = (item) => {
          setEditingItem(item)
          setFormData({ ...item })
          setShowModal(true)
        }

        const handleInputChange = (field, value) => {
          setFormData(prev => ({ ...prev, [field]: value }))
        }

        const getFilteredData = () => {
          let filtered = (data || []).filter(item => {
            const searchMatch = searchTerm === '' || 
              Object.values(item).some(value => 
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )

            if (type === 'tasks') {
              const statusMatch = filterStatus === 'all' || item.status === filterStatus
              return searchMatch && statusMatch
            }

            return searchMatch
          })

          return filtered
        }

        const renderFormFields = () => {
          switch (type) {
            case 'farms':
              return <FarmForm formData={formData} handleInputChange={handleInputChange} />
            case 'crops':
              return <CropForm formData={formData} handleInputChange={handleInputChange} farms={allFarms} />
            case 'tasks':
              return <TaskForm formData={formData} handleInputChange={handleInputChange} farms={allFarms} crops={allCrops} />
            case 'expenses':
              return <ExpenseForm formData={formData} handleInputChange={handleInputChange} farms={allFarms} />
            default:
              return null
          }
        }

        const renderListItems = () => {
          switch (type) {
            case 'farms':
              return <FarmList farms={getFilteredData()} crops={allCrops} handleEdit={handleEdit} handleDelete={handleDelete} />
            case 'crops':
              return <CropList crops={getFilteredData()} farms={allFarms} handleEdit={handleEdit} handleDelete={handleDelete} />
            case 'tasks':
              return <TaskList tasks={getFilteredData()} farms={allFarms} crops={allCrops} handleEdit={handleEdit} handleDelete={handleDelete} />
            case 'expenses':
              return <ExpenseList expenses={getFilteredData()} farms={allFarms} handleEdit={handleEdit} handleDelete={handleDelete} />
            default:
              return null
          }
        }

        const filteredData = getFilteredData()

        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Text as="h2" className="text-2xl lg:text-3xl font-bold text-surface-900 mb-2">
                  {titleMapping[type]}
                </Text>
                <Text as="p" className="text-surface-600">
                  {descriptionMapping[type]}
                </Text>
              </div>
              <Button
                onClick={() => {
                  resetForm()
                  setShowModal(true)
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark flex items-center space-x-2 font-medium"
              >
                <ApperIcon name="Plus" size={20} />
                <span>Add {type.slice(0, -1)}</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              
              {type === 'tasks' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredData.length > 0 ? (
                  renderListItems()
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ApperIcon name={iconMapping[type]} size={48} className="text-surface-400" />
                    </div>
                    <Text as="h3" className="text-xl font-semibold text-surface-900 mb-2">
                      No {type} found
                    </Text>
                    <Text as="p" className="text-surface-600 mb-6">
                      {searchTerm ? `No ${type} match your search criteria.` : `Start by adding your first ${type.slice(0, -1)}.`}
                    </Text>
                    {!searchTerm && (
                      <Button
                        onClick={() => {
                          resetForm()
                          setShowModal(true)
                        }}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark flex items-center space-x-2 font-medium mx-auto"
                      >
                        <ApperIcon name="Plus" size={20} />
                        <span>Add {type.slice(0, -1)}</span>
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={editingItem ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
              onSubmit={handleSubmit}
              isLoading={loading}
              isEditing={!!editingItem}
            >
              {renderFormFields()}
            </Modal>
          </div>
        )
      }

      export default MainContentSection