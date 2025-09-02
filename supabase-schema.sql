-- Script para crear la tabla de listas en Supabase
-- Ejecuta este script en el SQL Editor de Supabase

-- Crear la tabla de listas
CREATE TABLE IF NOT EXISTS listas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_listas_created_at ON listas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listas_completed ON listas(completed);

-- Habilitar Row Level Security (RLS)
ALTER TABLE listas ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir acceso público (puedes cambiarla según tus necesidades)
CREATE POLICY "Permitir acceso público a listas" ON listas
  FOR ALL USING (true);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar automáticamente updated_at
CREATE TRIGGER update_listas_updated_at 
  BEFORE UPDATE ON listas 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
