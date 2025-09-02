import { type NextRequest, NextResponse } from "next/server"
import { listaDb } from "@/lib/db"

export async function PUT(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedLista = await listaDb.updateLista(id, body)

    if (!updatedLista) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ lista: updatedLista }, { status: 200 })
  } catch (error) {
    console.error("Error updating lista:", error)
    return NextResponse.json({ error: "Error al actualizar la tarea" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const deleted = await listaDb.deleteLista(id)

    if (!deleted) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tarea eliminada" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting lista:", error)
    return NextResponse.json({ error: "Error al eliminar la tarea" }, { status: 500 })
  }
}
