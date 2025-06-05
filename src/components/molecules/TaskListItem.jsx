import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'
      import { format } from 'date-fns'

      const TaskListItem = ({ task }) => {
        const priorityClasses = {
          high: 'bg-error/10 text-error',
          medium: 'bg-warning/10 text-warning',
          low: 'bg-growth/10 text-growth'
        }

        return (
          <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
            <div>
              <Text as="h4" className="font-medium text-surface-900">{task.title}</Text>
              <Text as="p" className="text-sm text-surface-600">Due: {format(new Date(task.dueDate), 'toLocaleDateString')}</Text>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityClasses[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        )
      }

      export default TaskListItem