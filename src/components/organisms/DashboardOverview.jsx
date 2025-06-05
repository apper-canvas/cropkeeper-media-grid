import React from 'react'
      import Text from '@/components/atoms/Text'
      import StatCard from '@/components/molecules/StatCard'
      import WeatherDisplay from '@/components/molecules/WeatherDisplay'
      import TaskListItem from '@/components/molecules/TaskListItem'
      import ApperIcon from '@/components/ApperIcon'

      const DashboardOverview = ({ farms, crops, upcomingTasks, totalExpensesThisMonth, weather }) => {
        return (
          <div className="space-y-8">
            <div>
              <Text as="h2" className="text-2xl lg:text-3xl font-bold text-surface-900 mb-2">
                Farm Dashboard
              </Text>
              <Text as="p" className="text-surface-600">Overview of your farming operations</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                iconName="MapPin"
                iconBgColor="bg-primary/10"
                iconColor="text-primary"
                value={farms?.length || 0}
                title="Total Farms"
                description="Active farming locations"
              />
              <StatCard
                iconName="Sprout"
                iconBgColor="bg-growth/10"
                iconColor="text-growth"
                value={crops?.length || 0}
                title="Active Crops"
                description="Currently growing"
              />
              <StatCard
                iconName="Clock"
                iconBgColor="bg-warning/10"
                iconColor="text-warning"
                value={upcomingTasks?.length || 0}
                title="Pending Tasks"
                description="Upcoming activities"
              />
              <StatCard
                iconName="DollarSign"
                iconBgColor="bg-error/10"
                iconColor="text-error"
                value={`$${totalExpensesThisMonth.toFixed(2)}`}
                title="Monthly Expenses"
                description="This month's spending"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Text as="h3" className="text-xl font-semibold text-surface-900 mb-4">Recent Activity</Text>
                <div className="bg-white rounded-xl p-6 shadow-card">
                  {upcomingTasks?.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <TaskListItem key={task.id} task={task} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ApperIcon name="CheckCircle" size={48} className="text-surface-300 mx-auto mb-4" />
                      <Text as="p" className="text-surface-600">No upcoming tasks. Great job staying on top of things!</Text>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Text as="h3" className="text-xl font-semibold text-surface-900 mb-4">Weather Forecast</Text>
                <WeatherDisplay weather={weather} />
              </div>
            </div>
          </div>
        )
      }

      export default DashboardOverview