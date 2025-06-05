import React from 'react'
      import FormField from '@/components/molecules/FormField'
      import Button from '@/components/atoms/Button'
      import Card from '@/components/molecules/Card'
      import Text from '@/components/atoms/Text'

      const SettingsForm = () => {
        const unitOptions = [
          { value: 'imperial', label: 'Imperial (acres, °F)' },
          { value: 'metric', label: 'Metric (hectares, °C)' }
        ]

        const timeZoneOptions = [
          { value: 'et', label: 'Eastern Time (ET)' },
          { value: 'ct', label: 'Central Time (CT)' },
          { value: 'mt', label: 'Mountain Time (MT)' },
          { value: 'pt', label: 'Pacific Time (PT)' }
        ]

        const handleSubmit = (e) => {
          e.preventDefault()
          // Handle saving settings logic here
          console.log('Settings saved!')
          alert('Settings saved successfully!')
        }

        return (
          <div className="max-w-2xl">
            <Text as="h2" className="text-2xl font-bold text-surface-900 mb-6">Settings</Text>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Default Units"
                  type="select"
                  options={unitOptions}
                  value="imperial" // Placeholder, integrate with state management
                  onChange={() => {}} // Placeholder
                />
                
                <FormField
                  label="Time Zone"
                  type="select"
                  options={timeZoneOptions}
                  value="et" // Placeholder, integrate with state management
                  onChange={() => {}} // Placeholder
                />

                <FormField
                  label="Enable weather alerts"
                  type="checkbox"
                  value={true} // Placeholder
                  onChange={() => {}} // Placeholder
                />

                <FormField
                  label="Send task reminders"
                  type="checkbox"
                  value={true} // Placeholder
                  onChange={() => {}} // Placeholder
                />

                <Button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark font-medium">
                  Save Settings
                </Button>
              </form>
            </Card>
          </div>
        )
      }

      export default SettingsForm