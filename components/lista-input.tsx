"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Sparkles } from "lucide-react"

interface ListaInputProps {
  onAdd: (text: string) => void
}

export function ListaInput({ onAdd }: ListaInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText("")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Agregar nueva tarea</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="¿Qué necesitas hacer hoy?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-12 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-200"
          />
        </div>
        <Button
          type="submit"
          disabled={!text.trim()}
          className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5 mr-2" />
          Agregar
        </Button>
      </form>
    </div>
  )
}
