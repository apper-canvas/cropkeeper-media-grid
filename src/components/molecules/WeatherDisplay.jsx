import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/molecules/Card'
      import Spinner from '@/components/atoms/Spinner'

      const WeatherDisplay = ({ weather }) => {
        return (
          <Card className="p-6">
            {weather ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Sun" size={32} className="text-warning" />
                  </div>
                  <Text as="div" className="text-3xl font-bold text-surface-900">{weather.currentTemp}°F</Text>
                  <Text as="div" className="text-surface-600">{weather.conditions}</Text>
                  <Text as="div" className="text-sm text-surface-500 mt-2">Humidity: {weather.humidity}%</Text>
                </div>
                
                {weather.forecast && weather.forecast.length > 0 && (
                  <div className="border-t border-surface-200 pt-4">
                    <Text as="h4" className="text-sm font-medium text-surface-900 mb-3">5-Day Forecast</Text>
                    <div className="space-y-2">
                      {weather.forecast.slice(0, 5).map((day, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <Text as="span" className="text-surface-600">{day.day}</Text>
                          <div className="flex items-center space-x-2">
                            <ApperIcon name={day.icon} size={16} className="text-warning" />
                            <Text as="span" className="text-surface-900">{day.high}°/{day.low}°</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Spinner />
                </div>
                <Text as="p" className="text-surface-600">Loading weather data...</Text>
              </div>
            )}
          </Card>
        )
      }

      export default WeatherDisplay