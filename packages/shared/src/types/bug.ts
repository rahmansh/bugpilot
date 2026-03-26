export type BugStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type BugPriority = 'low' | 'medium' | 'high' | 'critical';
export interface Bug{
  id: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: BugPriority;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

// Create a new bug (client -> server)
// DTO - Data Transfer Object
export interface CreateBugDTO{
  title: string;
  description: string;
  priority: BugPriority;
  assignee?: string;
}

// UPDATE an existing bug
export interface UpdateBugDTO{
  title?: string;
  description?: string;
  status?: BugStatus;
  priority?: BugPriority;
  assignee?: string;
}