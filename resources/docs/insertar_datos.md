# 📥 Guía: Cómo Insertar Datos en la Base de Datos

Una vez que tienes la tabla y el modelo (el mayordomo), hay varias formas de meterle datos. Aquí te explico las 3 más comunes, de la más fácil a la "profesional".

---

## 🟢 Opción 1: La "Rápida" (Desde una Ruta)
Ideal para probar rápido si todo funciona.

1.  Abre el archivo `routes/web.php`.
2.  Añade una ruta nueva:

```php
use App\Models\Proyecto; // 👈 1. IMPORTANTE: Importar el modelo

Route::get('/crear-proyecto', function () {
    
    // 2. Pedirle al modelo que cree uno nuevo
    $nuevo = Proyecto::create([
        'nombre' => 'App de Tareas',
        'descripcion' => 'Una app para organizar el día',
        'presupuesto' => 1200
    ]);

    return "¡Proyecto creado! ID: " . $nuevo->id;
});
```

3.  Abre tu navegador y entra en: `http://localhost:8000/crear-proyecto` (o la URL de tu proyecto).
4.  ¡Listo! Verás el mensaje de confirmación.

---

## 🔵 Opción 2: La "Profesional" (Database Seeders)
Ideal para crear datos de prueba (falsos) automáticamente. Laravel tiene una fábrica de datos falsos llamada "Seeders".

### 1. Crear el Seeder
Ejecuta en la terminal:
```bash
php artisan make:seeder ProyectoSeeder
```

### 2. Editar el Seeder
Abre `database/seeders/ProyectoSeeder.php` y edita el método `run`:

```php
public function run(): void
{
    // Crear un proyecto
    \App\Models\Proyecto::create([
        'nombre' => 'Web Corporativa',
        'descripcion' => 'Sitio para empresa legal',
        'presupuesto' => 3000
    ]);

    // Crear otro...
    \App\Models\Proyecto::create([
        'nombre' => 'Tienda Online',
        'descripcion' => 'E-commerce de zapatos',
        'presupuesto' => 8500
    ]);
}
```

### 3. Activar el Seeder
Abre `database/seeders/DatabaseSeeder.php` y dile que use tu nuevo seeder:

```php
public function run(): void
{
    $this->call([
        ProyectoSeeder::class,
    ]);
}
```

### 4. Ejecutar
En la terminal:
```bash
php artisan db:seed
```
✅ *Esto insertará todos los proyectos que definiste de golpe.*

---

## 🟣 Opción 3: Modo Hacker (Tinker)
Si quieres meter un dato rápido sin tocar código de archivos, usa la consola interactiva **Tinker**.

1.  En la terminal escribe:
    ```bash
    php artisan tinker
    ```
2.  Ahora estás "dentro" de Laravel. Escribe código PHP directamente:
    ```php
    App\Models\Proyecto::create(['nombre'=>'Prueba Tinker', 'descripcion'=>'Desde consola', 'presupuesto'=>100]);
    ```
3.  Presiona Enter. Verás el objeto creado.
4.  Para salir escribe `exit`.

---

## ⚠️ ¿Te da Error?
Si ves un error que dice **"Add [campo] to fillable property"**:
Significa que olvidaste darle permiso al "mayordomo".
1.  Ve a `app/Models/Proyecto.php`.
2.  Asegúrate de tener la propiedad `$fillable`:
    ```php
    protected $fillable = ['nombre', 'descripcion', 'presupuesto'];
    ```
