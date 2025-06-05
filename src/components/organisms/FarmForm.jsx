import React from 'react'
      import FormField from '@/components/molecules/FormField'

      const FarmForm = ({ formData, handleInputChange }) => {
        const sizeUnitOptions = [
          { value: 'acres', label: 'Acres' },
          { value: 'hectares', label: 'Hectares' }
        ]

        const soilTypeOptions = [
          { value: 'clay', label: 'Clay' },
          { value: 'sandy', label: 'Sandy' },
          { value: 'loam', label: 'Loam' },
          { value: 'silt', label: 'Silt' }
        ]

        return (
          <div className="space-y-4">
            <FormField
              label="Farm Name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter farm name"
              required
            />
            <FormField
              label="Location"
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Size"
                type="number"
                value={formData.size || ''}
                onChange={(e) => handleInputChange('size', parseFloat(e.target.value))}
                placeholder="0"
                required
              />
              <FormField
                label="Unit"
                type="select"
                value={formData.sizeUnit || 'acres'}
                onChange={(e) => handleInputChange('sizeUnit', e.target.value)}
                options={sizeUnitOptions}
              />
            </div>
            <FormField
              label="Soil Type"
              type="select"
              value={formData.soilType || 'loam'}
              onChange={(e) => handleInputChange('soilType', e.target.value)}
              options={soilTypeOptions}
            />
          </div>
        )
      }

      export default FarmForm