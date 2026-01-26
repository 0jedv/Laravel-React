# 🏗️ Guía: Crear una Nueva Tabla y su "Mayordomo" (Modelo)

Si quieres guardar nuevos datos (por ejemplo: 'Proyectos', 'Clientes', 'Tareas'), necesitas dos cosas en Laravel:
1.  **Una Tabla** en la base de datos (el archivador donde se guardan los datos).
2.  **Un Modelo** (el mayordomo que gestiona esa tabla).

Aquí tienes el paso a paso detallado.

---

## 🟢 Paso 1: Crear la Tabla (La Migración)

En Laravel, no creamos la tabla directamente en la base de datos (como en phpMyAdmin). Usamos archivos llamados **migraciones**. Son como planos de arquitectura.

### 1.1 Ejecuta este comando en la terminal
Abre tu terminal en la carpeta del proyecto y escribe esto (sustituye `proyectos` por el nombre de tu tabla, **siempre en plural**):

```bash
php artisan make:migration create_proyectos_table
```

### 1.2 Edita el plano
Laravel ha creado un archivo nuevo en `database/migrations/xxxx_xx_xx_create_proyectos_table.php`. Ábrelo.
Busca la función `up()`. Ahí defines qué columnas tendrá tu tabla.

```php
public function up()
{
    Schema::create('proyectos', function (Blueprint $table) {
        $table->id(); // Crea automática el ID
        // 👇 AQUI AGREGAS TUS COLUMNAS
        $table->string('nombre');       // Para textos cortos
        $table->text('descripcion');    // Para textos largos
        $table->integer('presupuesto'); // Para números enteros
        $table->timestamps(); // Crea created_at y updated_at
    });
}
```

### 1.3 ¡Construye la tabla!
El plano está listo, pero la tabla aún no existe. Para construirla realmente, ejecuta:

```bash
php artisan migrate
```
✅ *¡Listo! Ahora tu base de datos ya tiene la tabla `proyectos`.*

---

## 🔵 Paso 2: Contratar al Mayordomo (El Modelo)

Ahora necesitas el archivo PHP que hablará con esa tabla.

### 2.1 Ejecuta este comando
Sustituye `Proyecto` por el nombre de tu modelo. **Importante**: El modelo debe ser en **Singular** (Laravel es listo y sabe que el modelo `Proyecto` busca la tabla `proyectos`).

```bash
php artisan make:model Proyecto
```

Esto crea el archivo `app/Models/Proyecto.php`.

### 2.2 Dale permisos al Mayordomo (`$fillable`)
Por seguridad, el mayordomo no deja guardar datos a menos que le des permiso explícito para cada campo. Abre `app/Models/Proyecto.php` y añade esto:

```php
class Proyecto extends Model
{
    use HasFactory;

    // 🛡️ Lista blanca de campos que se pueden guardar
    protected $fillable = [
        'nombre',
        'descripcion',
        'presupuesto'
    ];
}
```
*Si olvidas esto, al intentar guardar te dará un error de `MassAssignmentException`.*

---

## 🚀 Truco Pro: Todo en uno
Puedes hacer el paso 1 y 2 con un solo comando usando la bandera `-m` (migration):

```bash
# Crea el Modelo (Mayordomo) Y la Migración (Tabla) a la vez
php artisan make:model Proyecto -m
```

---

## 📝 Paso 3: ¿Cómo usar al Mayordomo?

Ahora, desde cualquier parte de tu código (por ejemplo, en un Controlador o en `routes/web.php`), puedes pedirle cosas al mayordomo.

### Crear un nuevo registro
```php
use App\Models\Proyecto; // 👈 ¡No olvides importar al mayordomo arriba!

Proyecto::create([
    'nombre' => 'Nuevo Diseño Web',
    'descripcion' => 'Rediseño completo del sitio',
    'presupuesto' => 5000
]);
```

### Leer datos
```php
// Obtener todos los proyectos
$todos = Proyecto::all();

// Buscar por ID
$uno = Proyecto::find(1);

// Buscar con condición
$baratos = Proyecto::where('presupuesto', '<', 1000)->get();
```

---
¡Eso es todo! Ahora tienes el flujo completo para agregar nuevas funcionalidades a tu TaskHub.
