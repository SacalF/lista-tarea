"use client"

import type { FilterType } from "@/types/lista"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Trash2 } from "lucide-react"

interface ListaFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  stats: {
    total: number
    active: number
    completed: number
  }
  onClearCompleted: () => void
}

export function ListaFilters({ currentFilter, onFilterChange, stats, onClearCompleted }: ListaFiltersProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "Todas", count: stats.total },
    { key: "active", label: "Pendientes", count: stats.active },
    { key: "completed", label: "Completadas", count: stats.completed },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Filtrar tareas</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {filters.map(({ key, label, count }) => (
            <Button
              key={key}
              variant={currentFilter === key ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-2 h-10 px-4 rounded-lg font-medium transition-all duration-200 ${
                currentFilter === key
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                  : "bg-background/50 hover:bg-background border-border/50 hover:border-primary/30"
              }`}
            >
              {label}
              <Badge
                variant="secondary"
                className={`text-xs font-semibold ${
                  currentFilter === key
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </Badge>
            </Button>
          ))}
        </div>

        {stats.completed > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="h-10 px-4 text-destructive hover:text-destructive-foreground hover:bg-destructive/10 border-destructive/30 hover:border-destructive rounded-lg font-medium transition-all duration-200 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar completadas
          </Button>
        )}
      </div>
    </div>
  )
}
