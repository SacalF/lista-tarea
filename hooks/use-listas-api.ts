"use client"

import { useState, useEffect } from "react"
import type { Lista, FilterType } from "@/types/lista"

export function useListasApi() {
  const [listas, setListas] = useState<Lista[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchListas()
  }, [])

  const fetchListas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/listas")

      if (!response.ok) {
        throw new Error("Error al cargar las tareas")
      }

      const data = await response.json()
      const parsedListas = data.listas.map((lista: any) => ({
        ...lista,
        createdAt: new Date(lista.createdAt),
        updatedAt: new Date(lista.updatedAt),
      }))

      setListas(parsedListas)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const addLista = async (text: string) => {
    try {
      setError(null)
      const response = await fetch("/api/listas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Error al crear la tarea")
      }

      const data = await response.json()
      const newLista = {
        ...data.lista,
        createdAt: new Date(data.lista.createdAt),
        updatedAt: new Date(data.lista.updatedAt),
      }

      setListas((prev) => [newLista, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la tarea")
    }
  }

  const toggleLista = async (id: string) => {
    try {
      setError(null)
      const lista = listas.find((t) => t.id === id)
      if (!lista) return

      const response = await fetch(`/api/listas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !lista.completed }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la tarea")
      }

      const data = await response.json()
      const updatedLista = {
        ...data.lista,
        createdAt: new Date(data.lista.createdAt),
        updatedAt: new Date(data.lista.updatedAt),
      }

      setListas((prev) => prev.map((t) => (t.id === id ? updatedLista : t)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar la tarea")
    }
  }

  const deleteLista = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/listas/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la tarea")
      }

      setListas((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar la tarea")
    }
  }

  const editLista = async (id: string, newText: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/listas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      })

      if (!response.ok) {
        throw new Error("Error al editar la tarea")
      }

      const data = await response.json()
      const updatedLista = {
        ...data.lista,
        createdAt: new Date(data.lista.createdAt),
        updatedAt: new Date(data.lista.updatedAt),
      }

      setListas((prev) => prev.map((t) => (t.id === id ? updatedLista : t)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al editar la tarea")
    }
  }

  const clearCompleted = async () => {
    try {
      setError(null)
      const response = await fetch("/api/listas", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al eliminar tareas completadas")
      }

      setListas((prev) => prev.filter((t) => !t.completed))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar tareas completadas")
    }
  }

  const filteredListas = listas.filter((lista) => {
    switch (filter) {
      case "active":
        return !lista.completed
      case "completed":
        return lista.completed
      default:
        return true
    }
  })

  const stats = {
    total: listas.length,
    active: listas.filter((lista) => !lista.completed).length,
    completed: listas.filter((lista) => lista.completed).length,
  }

  return {
    listas: filteredListas,
    filter,
    stats,
    loading,
    error,
    addLista,
    toggleLista,
    deleteLista,
    editLista,
    clearCompleted,
    setFilter,
    refetch: fetchListas,
  }
}
