import React from 'react'
      import FormField from '@/components/molecules/FormField'

      const TaskForm = ({ formData, handleInputChange, farms, crops }) => {
        const priorityOptions = [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]

        const statusOptions = [
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' }
        ]

        const farmOptions = [{ value: '', label: 'Select a farm' }].concat(
          farms?.map(farm => ({ value: farm.id, label: farm.name })) || []
        )

        const cropOptions = [{ value: '', label: 'Select a crop' }].concat(
          crops?.filter(crop => crop.farmId === formData.farmId).map(crop => ({ value: crop.id, label: crop.cropType })) || []
        )

        return (
          <div className="space-y-4">
            <FormField
              label="Task Title"
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter task title"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Farm"
                type="select"
                value={formData.farmId || ''}
                onChange={(e) => handleInputChange('farmId', e.target.value)}
                options={farmOptions}
                required
              />
              <FormField
                label="Crop (Optional)"
                type="select"
                value={formData.cropId || ''}
                onChange={(e) => handleInputChange('cropId', e.target.value)}
                options={cropOptions}
              />
            </div>
            <FormField
              label="Description"
              type="textarea"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Task description..."
              rows={3}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                label="Due Date"
                type="date"
                value={formData.dueDate || ''}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
              <FormField
                label="Priority"
                type="select"
                value={formData.priority || 'medium'}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                options={priorityOptions}
              />
              <FormField
                label="Status"
                type="select"
                value={formData.status || 'pending'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                options={statusOptions}
              />
            </div>
          </div>
        )
      }

      export default TaskForm