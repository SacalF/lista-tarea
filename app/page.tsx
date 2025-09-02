"use client"

import { useListasApi } from "@/hooks/use-listas-api"
import { ListaInput } from "@/components/lista-input"
import { ListaList } from "@/components/lista-list"
import { ListaFilters } from "@/components/lista-filters"
import { CheckSquare, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HomePage() {
  const {
    listas,
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
    refetch,
  } = useListasApi()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <CheckSquare className="h-12 w-12 text-primary" />
              <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground text-balance">Lista de Tareas</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Organiza tu día y mantén el control de tus tareas con estilo
          </p>
        </div>

        {error && (
          <div className="mb-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                {error}
                <button onClick={refetch} className="ml-4 text-sm underline hover:no-underline">
                  Reintentar
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 p-8">
          {/* Add Lista Input */}
          <div className="mb-8">
            <ListaInput onAdd={addLista} />
          </div>

          {/* Filters */}
          <div className="mb-8">
            <ListaFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
              onClearCompleted={clearCompleted}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Cargando tareas...</span>
            </div>
          ) : (
            /* Cambiando TodoList por ListaList y todos por listas */
            <ListaList listas={listas} onToggle={toggleLista} onDelete={deleteLista} onEdit={editLista} />
          )}
        </div>

        {/* Footer Stats */}
        {stats.total > 0 && !loading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-full px-6 py-3 border border-border/30">
              {stats.active > 0 ? (
                <p className="text-muted-foreground">
                  Tienes <span className="font-semibold text-primary">{stats.active}</span> tarea
                  {stats.active !== 1 ? "s" : ""} pendiente{stats.active !== 1 ? "s" : ""}
                </p>
              ) : (
                <p className="text-accent font-medium">¡Excelente! Has completado todas tus tareas ✨</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
