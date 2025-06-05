import React from 'react'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Select from '@/components/atoms/Select'
      import Text from '@/components/atoms/Text'

      const FormField = ({
        label,
        type = 'text',
        value,
        onChange,
        placeholder,
        required = false,
        options = [],
        rows = 3,
        step,
        readOnly = false,
        children // For custom input elements like textareas that aren't simple input/select
      }) => {
        const renderInput = () => {
          if (children) {
            return children;
          }

          if (type === 'select') {
            return (
              <Select
                value={value}
                onChange={onChange}
                options={options}
                required={required}
              />
            )
          } else if (type === 'textarea') {
            return (
              <textarea
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                rows={rows}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
              />
            )
          } else if (type === 'checkbox') {
            return (
              <input
                type="checkbox"
                checked={value}
                onChange={onChange}
                className="w-4 h-4 text-primary"
                readOnly={readOnly}
              />
            )
          } else {
            return (
              <Input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                step={step}
                readOnly={readOnly}
              />
            )
          }
        }

        return (
          <div>
            <Label>{label}</Label>
            {type === 'checkbox' ? (
              <div className="flex items-center space-x-3">
                {renderInput()}
                <Text as="span" className="text-surface-900">{label}</Text>
              </div>
            ) : (
              renderInput()
            )}
          </div>
        )
      }

      export default FormField