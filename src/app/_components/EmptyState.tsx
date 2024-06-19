import { User } from '@prisma/client'
import React from 'react'

interface EmptyStateProps {
    currentUser: User
}

const EmptyState = ({currentUser}: EmptyStateProps) => {
  return (
    <div>
      To Do: Empty state !
    </div>
  )
}

export default EmptyState
