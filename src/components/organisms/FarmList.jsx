import React from 'react'
      import Card from '@/components/molecules/Card'
      import CardIconCircle from '@/components/atoms/CardIconCircle'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import { format } from 'date-fns'

      const FarmList = ({ farms, crops, handleEdit, handleDelete }) => {
        return (
          <>
            {farms.map((item) => {
              const farmCrops = crops?.filter(crop => crop.farmId === item.id) || []
              return (
                <Card key={item.id} className="group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CardIconCircle
                        iconName="MapPin"
                        bgColorClass="bg-primary/10"
                        iconColorClass="text-primary"
                      />
                      <div>
                        <Text as="h3" className="text-xl font-semibold text-surface-900">{item.name}</Text>
                        <Text as="p" className="text-surface-600">{item.location}</Text>
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
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Maximize" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600">{item.size} {item.sizeUnit}</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Layers" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600">{item.soilType} soil</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Sprout" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600">{farmCrops.length} active crops</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Calendar" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600">{format(new Date(item.createdAt), 'MMM yyyy')}</Text>
                    </div>
                  </div>
                </Card>
              )
            })}
          </>
        )
      }

      export default FarmList