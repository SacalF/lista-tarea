"use client"

import { useState, useEffect } from "react"
import type { Lista, FilterType } from "@/types/lista"
import { listaDb } from "@/lib/db"
import { useSupabaseError } from "./use-supabase-error"

export function useListas() {
  const [listas, setListas] = useState<Lista[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { handleError } = useSupabaseError()

  // Cargar listas al inicializar
  useEffect(() => {
    loadListas()
  }, [])

  const loadListas = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await listaDb.getAllListas()
      setListas(data)
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al cargar listas:", err)
    } finally {
      setLoading(false)
    }
  }

  const addLista = async (text: string) => {
    try {
      setError(null)
      const newLista = await listaDb.createLista(text)
      setListas((prev) => [newLista, ...prev])
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al crear lista:", err)
    }
  }

  const toggleLista = async (id: string) => {
    try {
      setError(null)
      const currentLista = listas.find(lista => lista.id === id)
      if (!currentLista) return

      const updatedLista = await listaDb.updateLista(id, { 
        completed: !currentLista.completed 
      })
      
      if (updatedLista) {
        setListas((prev) =>
          prev.map((lista) => 
            lista.id === id ? updatedLista : lista
          )
        )
      }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al actualizar lista:", err)
    }
  }

  const deleteLista = async (id: string) => {
    try {
      setError(null)
      const success = await listaDb.deleteLista(id)
      if (success) {
        setListas((prev) => prev.filter((lista) => lista.id !== id))
      }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al eliminar lista:", err)
    }
  }

  const editLista = async (id: string, newText: string) => {
    try {
      setError(null)
      const updatedLista = await listaDb.updateLista(id, { text: newText })
      
      if (updatedLista) {
        setListas((prev) =>
          prev.map((lista) => 
            lista.id === id ? updatedLista : lista
          )
        )
      }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al editar lista:", err)
    }
  }

  const clearCompleted = async () => {
    try {
      setError(null)
      const deletedCount = await listaDb.clearCompleted()
      if (deletedCount > 0) {
        setListas((prev) => prev.filter((lista) => !lista.completed))
      }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      console.error("Error al limpiar listas completadas:", err)
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
    refresh: loadListas,
  }
}
