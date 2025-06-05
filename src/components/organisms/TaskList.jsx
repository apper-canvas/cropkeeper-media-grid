import React from 'react'
      import Card from '@/components/molecules/Card'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import { format } from 'date-fns'

      const TaskList = ({ tasks, farms, crops, handleEdit, handleDelete }) => {
        return (
          <>
            {tasks.map((item) => {
              const taskFarm = farms?.find(f => f.id === item.farmId)
              const taskCrop = crops?.find(c => c.id === item.cropId)
              const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed'
              
              return (
                <Card key={item.id} className={`border-l-4 ${
                  item.status === 'completed' ? 'border-growth' :
                  isOverdue ? 'border-error' :
                  item.priority === 'high' ? 'border-warning' :
                  'border-primary'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Text as="h3" className="text-lg font-semibold text-surface-900">{item.title}</Text>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'high' ? 'bg-error/10 text-error' :
                          item.priority === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-surface/10 text-surface-600'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <Text as="p" className="text-surface-600 text-sm mb-2">{item.description}</Text>
                      <div className="flex items-center space-x-4 text-sm text-surface-500">
                        <Text as="span">📍 {taskFarm?.name || 'Unknown Farm'}</Text>
                        {taskCrop && <Text as="span">🌱 {taskCrop.cropType}</Text>}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Text as="span" className="text-sm text-surface-600">
                        Due: {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                      </Text>
                      {isOverdue && (
                        <Text as="span" className="text-xs text-error font-medium">Overdue</Text>
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
                </Card>
              )
            })}
          </>
        )
      }

      export default TaskList