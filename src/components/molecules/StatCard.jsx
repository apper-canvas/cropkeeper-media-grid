import React from 'react'
      import Card from '@/components/molecules/Card'
      import CardIconCircle from '@/components/atoms/CardIconCircle'
      import Text from '@/components/atoms/Text'

      const StatCard = ({ iconName, iconBgColor, iconColor, value, title, description }) => {
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardIconCircle
                iconName={iconName}
                bgColorClass={iconBgColor}
                iconColorClass={iconColor}
              />
              <Text as="span" className="text-2xl font-bold text-surface-900">{value}</Text>
            </div>
            <Text as="h3" className="font-semibold text-surface-900">{title}</Text>
            <Text as="p" className="text-sm text-surface-600 mt-1">{description}</Text>
          </Card>
        )
      }

      export default StatCard