export interface Bug {
  id: string
  title: string
  description: string
  status: 'open' | 'in-progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  assignee?: string
  createdAt: Date
  updatedAt: Date
}

export type BugStatus = Bug['status']
export type BugPriority = Bug['priority']

export interface CreateBugDTO {
  title: string
  description: string
  priority: BugPriority
  assignee?: string
}

export interface UpdateBugDTO {
  title?: string
  description?: string
  status?: BugStatus
  priority?: BugPriority
  assignee?: string
}
