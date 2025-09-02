"use client"

import type { Lista } from "@/types/lista"
import { ListaItem } from "./lista-item"
import { ListTodo, CheckCircle2 } from "lucide-react"

interface ListaListProps {
  listas: Lista[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function ListaList({ listas, onToggle, onDelete, onEdit }: ListaListProps) {
  if (listas.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Tus tareas</h2>
        </div>

        <div className="text-center py-16 bg-card/30 rounded-xl border border-dashed border-border/50">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-muted/50 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">No hay tareas para mostrar</p>
              <p className="text-sm text-muted-foreground">¡Agrega tu primera tarea arriba para comenzar!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ListTodo className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Tus tareas</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent ml-4"></div>
      </div>

      <div className="space-y-3">
        {listas.map((lista) => (
          <ListaItem key={lista.id} lista={lista} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}
