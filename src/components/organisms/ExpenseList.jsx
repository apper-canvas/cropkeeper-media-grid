import React from 'react'
      import Card from '@/components/molecules/Card'
      import CardIconCircle from '@/components/atoms/CardIconCircle'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import { format } from 'date-fns'

      const ExpenseList = ({ expenses, farms, handleEdit, handleDelete }) => {
        return (
          <>
            {expenses.map((item) => {
              const expenseFarm = farms?.find(f => f.id === item.farmId)
              return (
                <Card key={item.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CardIconCircle
                        iconName="DollarSign"
                        bgColorClass="bg-error/10"
                        iconColorClass="text-error"
                      />
                      <div>
                        <Text as="h3" className="text-lg font-semibold text-surface-900">{item.description}</Text>
                        <Text as="p" className="text-surface-600">{expenseFarm?.name || 'Unknown Farm'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Text as="span" className="text-xl font-bold text-error">${item.amount.toFixed(2)}</Text>
                      <div className="flex space-x-1">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Tag" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600 capitalize">{item.category}</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Calendar" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600">{format(new Date(item.date), 'MMM dd, yyyy')}</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="CreditCard" size={16} className="text-surface-400" />
                      <Text as="span" className="text-surface-600 capitalize">{item.paymentMethod?.replace('-', ' ')}</Text>
                    </div>
                  </div>
                </Card>
              )
            })}
          </>
        )
      }

      export default ExpenseList