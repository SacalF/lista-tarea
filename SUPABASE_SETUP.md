# Configuración de Supabase para Lista de Tareas

## Pasos para configurar Supabase:

### 1. Crear cuenta en Supabase
- Ve a [supabase.com](https://supabase.com)
- Crea una cuenta gratuita
- Crea un nuevo proyecto

### 2. Obtener credenciales
- En tu proyecto de Supabase, ve a **Settings** > **API**
- Copia la **URL** y la **anon key**

### 3. Crear archivo de variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase_aqui
```

### 4. Configurar la base de datos
- Ve a **SQL Editor** en tu proyecto de Supabase
- Copia y pega el contenido del archivo `supabase-schema.sql`
- Ejecuta el script

### 5. Probar la aplicación
- Ejecuta `npm run dev`
- La aplicación ahora debería funcionar con Supabase

## Estructura de la base de datos

La tabla `listas` tiene los siguientes campos:
- `id`: UUID único (generado automáticamente)
- `text`: Texto de la tarea
- `completed`: Estado de completado (true/false)
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última actualización

## Características implementadas

- ✅ Conexión a Supabase
- ✅ CRUD completo de tareas
- ✅ Manejo de errores
- ✅ Índices para mejor rendimiento
- ✅ Row Level Security habilitado
- ✅ Trigger para actualización automática de timestamps

## Solución de problemas

Si encuentras errores:
1. Verifica que las variables de entorno estén correctas
2. Asegúrate de que la tabla `listas` exista en Supabase
3. Revisa la consola del navegador para errores
4. Verifica que las políticas de RLS permitan acceso
