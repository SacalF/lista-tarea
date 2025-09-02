"use client"

import type React from "react"
import { useState } from "react"
import type { Lista } from "@/types/lista"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Trash2, Edit3, Check, X, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface ListaItemProps {
  lista: Lista
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function ListaItem({ lista, onToggle, onDelete, onEdit }: ListaItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(lista.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== lista.text) {
      onEdit(lista.id, editText)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(lista.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <Card
      className={cn(
        "group p-5 transition-all duration-300 hover:shadow-lg border-border/30 bg-card/80 backdrop-blur-sm",
        lista.completed && "bg-muted/30 border-muted/50",
        !lista.completed && "hover:border-primary/20 hover:shadow-primary/5",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Checkbox
            checked={lista.completed}
            onCheckedChange={() => onToggle(lista.id)}
            className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
          />
        </div>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-3">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-lg"
              autoFocus
            />
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEdit}
                className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10 rounded-md"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "block text-base font-medium transition-all duration-300 break-words",
                  lista.completed && "line-through text-muted-foreground",
                  !lista.completed && "text-foreground",
                )}
              >
                {lista.text}
              </span>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Creada: {new Date(lista.createdAt).toLocaleDateString("es-ES")}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={lista.completed}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-md disabled:opacity-30"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(lista.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
