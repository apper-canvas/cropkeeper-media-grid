import React from 'react'
      import Card from '@/components/molecules/Card'
      import CardIconCircle from '@/components/atoms/CardIconCircle'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import { format, differenceInDays } from 'date-fns'

      const CropList = ({ crops, farms, handleEdit, handleDelete }) => {
        return (
          <>
            {crops.map((item) => {
              const farm = farms?.find(f => f.id === item.farmId)
              const daysToHarvest = differenceInDays(new Date(item.expectedHarvestDate), new Date())
              return (
                <Card key={item.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CardIconCircle
                        iconName="Sprout"
                        bgColorClass="bg-growth/10"
                        iconColorClass="text-growth"
                      />
                      <div>
                        <Text as="h3" className="text-xl font-semibold text-surface-900 capitalize">{item.cropType}</Text>
                        <Text as="p" className="text-surface-600">{farm?.name || 'Unknown Farm'}</Text>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-surface-400 hover:text-primary"
                      >
                        <ApperIcon name="Edit2" size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-surface-400 hover:text-error"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-sm text-surface-600">Growth Stage:</Text>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        item.growthStage === 'ready' ? 'bg-harvest/10 text-harvest' :
                        item.growthStage === 'harvested' ? 'bg-surface-100 text-surface-600' :
                        'bg-growth/10 text-growth'
                      }`}>
                        {item.growthStage}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-sm text-surface-600">Planted:</Text>
                      <Text as="span" className="text-sm text-surface-900">{format(new Date(item.plantingDate), 'MMM dd, yyyy')}</Text>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-sm text-surface-600">Expected Harvest:</Text>
                      <Text as="span" className="text-sm text-surface-900">{format(new Date(item.expectedHarvestDate), 'MMM dd, yyyy')}</Text>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-sm text-surface-600">Days to Harvest:</Text>
                      <Text as="span" className={`text-sm font-medium ${daysToHarvest <= 7 ? 'text-warning' : 'text-surface-900'}`}>
                        {daysToHarvest > 0 ? `${daysToHarvest} days` : 'Ready!'}
                      </Text>
                    </div>
                    
                    {item.area && (
                      <div className="flex items-center justify-between">
                        <Text as="span" className="text-sm text-surface-600">Area:</Text>
                        <Text as="span" className="text-sm text-surface-900">{item.area} acres</Text>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </>
        )
      }

      export default CropList