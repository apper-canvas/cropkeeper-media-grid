import React from 'react'
      import FormField from '@/components/molecules/FormField'

      const ExpenseForm = ({ formData, handleInputChange, farms }) => {
        const categoryOptions = [
          { value: 'seeds', label: 'Seeds' },
          { value: 'fertilizer', label: 'Fertilizer' },
          { value: 'equipment', label: 'Equipment' },
          { value: 'labor', label: 'Labor' },
          { value: 'fuel', label: 'Fuel' },
          { value: 'maintenance', label: 'Maintenance' },
          { value: 'other', label: 'Other' }
        ]

        const paymentMethodOptions = [
          { value: 'cash', label: 'Cash' },
          { value: 'credit', label: 'Credit Card' },
          { value: 'check', label: 'Check' },
          { value: 'bank-transfer', label: 'Bank Transfer' }
        ]

        const farmOptions = [{ value: '', label: 'Select a farm' }].concat(
          farms?.map(farm => ({ value: farm.id, label: farm.name })) || []
        )

        return (
          <div className="space-y-4">
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
                label="Date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Amount ($)"
                type="number"
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                placeholder="0.00"
                step="0.01"
                required
              />
              <FormField
                label="Category"
                type="select"
                value={formData.category || 'seeds'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                options={categoryOptions}
              />
            </div>
            <FormField
              label="Description"
              type="text"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Expense description"
              required
            />
            <FormField
              label="Payment Method"
              type="select"
              value={formData.paymentMethod || 'cash'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              options={paymentMethodOptions}
            />
          </div>
        )
      }

      export default ExpenseForm