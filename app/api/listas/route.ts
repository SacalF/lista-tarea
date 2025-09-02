import { type NextRequest, NextResponse } from "next/server"
import { listaDb } from "@/lib/db"

export async function GET() {
  try {
    const listas = await listaDb.getAllListas()
    return NextResponse.json({ listas }, { status: 200 })
  } catch (error) {
    console.error("Error fetching listas:", error)
    return NextResponse.json({ error: "Error al obtener las tareas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "El texto de la tarea es requerido" }, { status: 400 })
    }

    const newLista = await listaDb.createLista(text)
    return NextResponse.json({ lista: newLista }, { status: 201 })
  } catch (error) {
    console.error("Error creating lista:", error)
    return NextResponse.json({ error: "Error al crear la tarea" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const deletedCount = await listaDb.clearCompleted()
    return NextResponse.json(
      {
        message: `${deletedCount} tareas completadas eliminadas`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error clearing completed listas:", error)
    return NextResponse.json({ error: "Error al eliminar tareas completadas" }, { status: 500 })
  }
}
