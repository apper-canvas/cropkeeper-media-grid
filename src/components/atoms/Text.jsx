import React from 'react'

      const Text = ({ children, className = '', as = 'p' }) => {
        const Tag = as
        return <Tag className={className}>{children}</Tag>
      }

      export default Text