import React from 'react'
      import FormField from '@/components/molecules/FormField'
      import { format } from 'date-fns'

      const CropForm = ({ formData, handleInputChange, farms }) => {
        const cropTypeOptions = [
          { value: '', label: 'Select crop type' },
          { value: 'corn', label: 'Corn' },
          { value: 'wheat', label: 'Wheat' },
          { value: 'soybeans', label: 'Soybeans' },
          { value: 'tomatoes', label: 'Tomatoes' },
          { value: 'potatoes', label: 'Potatoes' },
          { value: 'lettuce', label: 'Lettuce' },
          { value: 'carrots', label: 'Carrots' },
          { value: 'peppers', label: 'Peppers' }
        ]

        const growthStageOptions = [
          { value: 'planted', label: 'Planted' },
          { value: 'sprouting', label: 'Sprouting' },
          { value: 'growing', label: 'Growing' },
          { value: 'flowering', label: 'Flowering' },
          { value: 'ripening', label: 'Ripening' },
          { value: 'ready', label: 'Ready to Harvest' },
          { value: 'harvested', label: 'Harvested' }
        ]

        const farmOptions = [{ value: '', label: 'Select a farm' }].concat(
          farms?.map(farm => ({ value: farm.id, label: farm.name })) || []
        )

        return (
          <div className="space-y-4">
            <FormField
              label="Farm"
              type="select"
              value={formData.farmId || ''}
              onChange={(e) => handleInputChange('farmId', e.target.value)}
              options={farmOptions}
              required
            />
            <FormField
              label="Crop Type"
              type="select"
              value={formData.cropType || ''}
              onChange={(e) => handleInputChange('cropType', e.target.value)}
              options={cropTypeOptions}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Planting Date"
                type="date"
                value={formData.plantingDate || ''}
                onChange={(e) => handleInputChange('plantingDate', e.target.value)}
                required
              />
              <FormField
                label="Expected Harvest"
                type="date"
                value={formData.expectedHarvestDate || ''}
                onChange={(e) => handleInputChange('expectedHarvestDate', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Growth Stage"
                type="select"
                value={formData.growthStage || 'planted'}
                onChange={(e) => handleInputChange('growthStage', e.target.value)}
                options={growthStageOptions}
              />
              <FormField
                label="Area (acres)"
                type="number"
                value={formData.area || ''}
                onChange={(e) => handleInputChange('area', parseFloat(e.target.value))}
                placeholder="0"
                step="0.1"
              />
            </div>
            <FormField
              label="Notes"
              type="textarea"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>
        )
      }

      export default CropForm