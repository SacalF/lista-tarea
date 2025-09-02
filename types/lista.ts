export interface Lista {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type FilterType = "all" | "active" | "completed"
