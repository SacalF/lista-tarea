import type { Lista } from "@/types/lista"
import { supabase } from "./supabase"

export class ListaDatabase {
  async getAllListas(): Promise<Lista[]> {
    try {
      const { data, error } = await supabase
        .from('listas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error al obtener listas:', error)
        throw error
      }

      return data?.map(lista => ({
        id: lista.id,
        text: lista.text,
        completed: lista.completed,
        createdAt: new Date(lista.created_at),
        updatedAt: new Date(lista.updated_at)
      })) || []
    } catch (error) {
      console.error('Error en getAllListas:', error)
      return []
    }
  }

  async createLista(text: string): Promise<Lista> {
    try {
      const newLista = {
        text: text.trim(),
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('listas')
        .insert(newLista)
        .select()
        .single()

      if (error) {
        console.error('Error al crear lista:', error)
        throw error
      }

      return {
        id: data.id,
        text: data.text,
        completed: data.completed,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error en createLista:', error)
      throw error
    }
  }

  async updateLista(id: string, updates: Partial<Pick<Lista, "text" | "completed">>): Promise<Lista | null> {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('listas')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error al actualizar lista:', error)
        return null
      }

      return {
        id: data.id,
        text: data.text,
        completed: data.completed,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error en updateLista:', error)
      return null
    }
  }

  async deleteLista(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('listas')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error al eliminar lista:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error en deleteLista:', error)
      return false
    }
  }

  async clearCompleted(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('listas')
        .delete()
        .eq('completed', true)

      if (error) {
        console.error('Error al limpiar listas completadas:', error)
        return 0
      }

      return count || 0
    } catch (error) {
      console.error('Error en clearCompleted:', error)
      return 0
    }
  }
}

// Singleton instance
export const listaDb = new ListaDatabase()
