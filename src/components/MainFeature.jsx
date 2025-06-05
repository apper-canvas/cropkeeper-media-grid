import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays, differenceInDays } from 'date-fns'
import ApperIcon from './ApperIcon'
import farmService from '../services/api/farmService'
import cropService from '../services/api/cropService'
import taskService from '../services/api/taskService'
import expenseService from '../services/api/expenseService'

const MainFeature = ({ type, farms, setFarms, crops, setCrops, tasks, setTasks, expenses, setExpenses }) => {
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

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
        const updateStates = {
          farms: setFarms,
          crops: setCrops,
          tasks: setTasks,
          expenses: setExpenses
        }
        const currentData = { farms, crops, tasks, expenses }[type]
        updateStates[type](currentData.map(item => item.id === editingItem.id ? result : item))
        toast.success(`${type.slice(0, -1)} updated successfully!`)
      } else {
        result = await service.create(formData)
        const updateStates = {
          farms: setFarms,
          crops: setCrops,
          tasks: setTasks,
          expenses: setExpenses
        }
        const currentData = { farms, crops, tasks, expenses }[type]
        updateStates[type]([...currentData, result])
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
      
      const updateStates = {
        farms: setFarms,
        crops: setCrops,
        tasks: setTasks,
        expenses: setExpenses
      }
      const currentData = { farms, crops, tasks, expenses }[type]
      updateStates[type](currentData.filter(item => item.id !== id))
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
    const currentData = { farms, crops, tasks, expenses }[type] || []
    
    let filtered = currentData.filter(item => {
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
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Farm Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter farm name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter location"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Size</label>
                <input
                  type="number"
                  value={formData.size || ''}
                  onChange={(e) => handleInputChange('size', parseFloat(e.target.value))}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Unit</label>
                <select
                  value={formData.sizeUnit || 'acres'}
                  onChange={(e) => handleInputChange('sizeUnit', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Soil Type</label>
              <select
                value={formData.soilType || 'loam'}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loam">Loam</option>
                <option value="silt">Silt</option>
              </select>
            </div>
          </div>
        )

      case 'crops':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Farm</label>
              <select
                value={formData.farmId || ''}
                onChange={(e) => handleInputChange('farmId', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select a farm</option>
                {farms?.map(farm => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Crop Type</label>
              <select
                value={formData.cropType || ''}
                onChange={(e) => handleInputChange('cropType', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select crop type</option>
                <option value="corn">Corn</option>
                <option value="wheat">Wheat</option>
                <option value="soybeans">Soybeans</option>
                <option value="tomatoes">Tomatoes</option>
                <option value="potatoes">Potatoes</option>
                <option value="lettuce">Lettuce</option>
                <option value="carrots">Carrots</option>
                <option value="peppers">Peppers</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Planting Date</label>
                <input
                  type="date"
                  value={formData.plantingDate || ''}
                  onChange={(e) => handleInputChange('plantingDate', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Expected Harvest</label>
                <input
                  type="date"
                  value={formData.expectedHarvestDate || ''}
                  onChange={(e) => handleInputChange('expectedHarvestDate', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Growth Stage</label>
                <select
                  value={formData.growthStage || 'planted'}
                  onChange={(e) => handleInputChange('growthStage', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="planted">Planted</option>
                  <option value="sprouting">Sprouting</option>
                  <option value="growing">Growing</option>
                  <option value="flowering">Flowering</option>
                  <option value="ripening">Ripening</option>
                  <option value="ready">Ready to Harvest</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Area (acres)</label>
                <input
                  type="number"
                  value={formData.area || ''}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value))}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0"
                  step="0.1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                rows="3"
                placeholder="Additional notes..."
              />
            </div>
          </div>
        )

      case 'tasks':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Task Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Farm</label>
                <select
                  value={formData.farmId || ''}
                  onChange={(e) => handleInputChange('farmId', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a farm</option>
                  {farms?.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Crop (Optional)</label>
                <select
                  value={formData.cropId || ''}
                  onChange={(e) => handleInputChange('cropId', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select a crop</option>
                  {crops?.filter(crop => crop.farmId === formData.farmId).map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.cropType}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                rows="3"
                placeholder="Task description..."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Priority</label>
                <select
                  value={formData.priority || 'medium'}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Status</label>
                <select
                  value={formData.status || 'pending'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'expenses':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Farm</label>
                <select
                  value={formData.farmId || ''}
                  onChange={(e) => handleInputChange('farmId', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a farm</option>
                  {farms?.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Amount ($)</label>
                <input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 mb-2">Category</label>
                <select
                  value={formData.category || 'seeds'}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="seeds">Seeds</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="equipment">Equipment</option>
                  <option value="labor">Labor</option>
                  <option value="fuel">Fuel</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Description</label>
              <input
                type="text"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Expense description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900 mb-2">Payment Method</label>
              <select
                value={formData.paymentMethod || 'cash'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="check">Check</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderListItem = (item) => {
    switch (type) {
      case 'farms':
        const farmCrops = crops?.filter(crop => crop.farmId === item.id) || []
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-farm transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-900">{item.name}</h3>
                  <p className="text-surface-600">{item.location}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-surface-400 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Edit2" size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-surface-400 hover:text-error transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Maximize" size={16} className="text-surface-400" />
                <span className="text-surface-600">{item.size} {item.sizeUnit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Layers" size={16} className="text-surface-400" />
                <span className="text-surface-600">{item.soilType} soil</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Sprout" size={16} className="text-surface-400" />
                <span className="text-surface-600">{farmCrops.length} active crops</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={16} className="text-surface-400" />
                <span className="text-surface-600">{format(new Date(item.createdAt), 'MMM yyyy')}</span>
              </div>
            </div>
          </motion.div>
        )

      case 'crops':
        const farm = farms?.find(f => f.id === item.farmId)
        const daysToHarvest = differenceInDays(new Date(item.expectedHarvestDate), new Date())
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-farm transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-growth/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Sprout" size={24} className="text-growth" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-900 capitalize">{item.cropType}</h3>
                  <p className="text-surface-600">{farm?.name || 'Unknown Farm'}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-surface-400 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Edit2" size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-surface-400 hover:text-error transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600">Growth Stage:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  item.growthStage === 'ready' ? 'bg-harvest/10 text-harvest' :
                  item.growthStage === 'harvested' ? 'bg-surface-100 text-surface-600' :
                  'bg-growth/10 text-growth'
                }`}>
                  {item.growthStage}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600">Planted:</span>
                <span className="text-sm text-surface-900">{format(new Date(item.plantingDate), 'MMM dd, yyyy')}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600">Expected Harvest:</span>
                <span className="text-sm text-surface-900">{format(new Date(item.expectedHarvestDate), 'MMM dd, yyyy')}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600">Days to Harvest:</span>
                <span className={`text-sm font-medium ${daysToHarvest <= 7 ? 'text-warning' : 'text-surface-900'}`}>
                  {daysToHarvest > 0 ? `${daysToHarvest} days` : 'Ready!'}
                </span>
              </div>
              
              {item.area && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-600">Area:</span>
                  <span className="text-sm text-surface-900">{item.area} acres</span>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'tasks':
        const taskFarm = farms?.find(f => f.id === item.farmId)
        const taskCrop = crops?.find(c => c.id === item.cropId)
        const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed'
        
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-xl p-6 shadow-card hover:shadow-farm transition-all duration-200 border-l-4 ${
              item.status === 'completed' ? 'border-growth' :
              isOverdue ? 'border-error' :
              item.priority === 'high' ? 'border-warning' :
              'border-primary'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-surface-900">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-error/10 text-error' :
                    item.priority === 'medium' ? 'bg-warning/10 text-warning' :
                    'bg-surface/10 text-surface-600'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-surface-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center space-x-4 text-sm text-surface-500">
                  <span>📍 {taskFarm?.name || 'Unknown Farm'}</span>
                  {taskCrop && <span>🌱 {taskCrop.cropType}</span>}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-surface-400 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Edit2" size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-surface-400 hover:text-error transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-surface-600">
                  Due: {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                </span>
                {isOverdue && (
                  <span className="text-xs text-error font-medium">Overdue</span>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                item.status === 'completed' ? 'bg-growth/10 text-growth' :
                item.status === 'in-progress' ? 'bg-warning/10 text-warning' :
                'bg-surface/10 text-surface-600'
              }`}>
                {item.status.replace('-', ' ')}
              </span>
            </div>
          </motion.div>
        )

      case 'expenses':
        const expenseFarm = farms?.find(f => f.id === item.farmId)
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-farm transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" size={24} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900">{item.description}</h3>
                  <p className="text-surface-600">{expenseFarm?.name || 'Unknown Farm'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-error">${item.amount.toFixed(2)}</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-surface-400 hover:text-primary transition-colors"
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-surface-400 hover:text-error transition-colors"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Tag" size={16} className="text-surface-400" />
                <span className="text-surface-600 capitalize">{item.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={16} className="text-surface-400" />
                <span className="text-surface-600">{format(new Date(item.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="CreditCard" size={16} className="text-surface-400" />
                <span className="text-surface-600 capitalize">{item.paymentMethod?.replace('-', ' ')}</span>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const filteredData = getFilteredData()

  const titleMapping = {
    farms: 'Farm Management',
    crops: 'Crop Tracking',
    tasks: 'Task Management', 
    expenses: 'Expense Tracking'
  }

  const iconMapping = {
    farms: 'MapPin',
    crops: 'Sprout',
    tasks: 'CheckSquare',
    expenses: 'DollarSign'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-surface-900 mb-2">
            {titleMapping[type]}
          </h2>
          <p className="text-surface-600">
            {type === 'farms' && 'Manage your farming locations and properties'}
            {type === 'crops' && 'Track your crop planting and growth progress'}
            {type === 'tasks' && 'Organize and monitor your farming activities'}
            {type === 'expenses' && 'Keep track of your farm-related expenses'}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark flex items-center space-x-2 font-medium"
        >
          <ApperIcon name="Plus" size={20} />
          <span>Add {type.slice(0, -1)}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
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

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                {renderListItem(item)}
              </div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name={iconMapping[type]} size={48} className="text-surface-400" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">
                No {type} found
              </h3>
              <p className="text-surface-600 mb-6">
                {searchTerm ? `No ${type} match your search criteria.` : `Start by adding your first ${type.slice(0, -1)}.`}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => {
                    resetForm()
                    setShowModal(true)
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark flex items-center space-x-2 font-medium mx-auto"
                >
                  <ApperIcon name="Plus" size={20} />
                  <span>Add {type.slice(0, -1)}</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-surface-900">
                  {editingItem ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-surface-400 hover:text-surface-600 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {renderFormFields()}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 font-medium flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingItem ? 'Update' : 'Create'}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature