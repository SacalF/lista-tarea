import { PostgrestError } from '@supabase/supabase-js'

export const useSupabaseError = () => {
  const handleError = (error: PostgrestError | Error | unknown) => {
    if (error instanceof Error) {
      console.error('Error:', error.message)
      return error.message
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const postgrestError = error as PostgrestError
      console.error('Error de Supabase:', postgrestError.message)
      return postgrestError.message
    }
    
    console.error('Error desconocido:', error)
    return 'Ha ocurrido un error inesperado'
  }

  const isNetworkError = (error: PostgrestError | Error | unknown): boolean => {
    if (error instanceof Error) {
      return error.message.includes('fetch') || error.message.includes('network')
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const postgrestError = error as PostgrestError
      return postgrestError.message.includes('fetch') || postgrestError.message.includes('network')
    }
    
    return false
  }

  return {
    handleError,
    isNetworkError
  }
}
