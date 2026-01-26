# 🧠 Cómo funcionan las Consultas y Endpoints en Laravel

Este documento explica paso a paso cómo crear una consulta a la base de datos y exponerla en una API, desmitificando la "magia" que Laravel hace por debajo.

---

## 🏗️ Paso a Paso: Crear una Consulta y Endpoint

Si quieres sacar datos nuevos de tu base de datos, este es el flujo de trabajo estándar en Laravel:

### 1. Definir la Ruta (El "Mapa")
**Archivo:** `routes/api.php`
Aquí defines la URL pública. Cuando alguien visita `/api/productos`, Laravel mira este archivo para saber qué hacer.

```php
// Ejemplo: Obtener productos
Route::get('/productos', function () {
    return Product::all();
});
```

> [!WARNING]
> **⚠️ Cuidado con el ORDEN de las rutas**
> Laravel lee las rutas de arriba a abajo. Si tienes una ruta con comodín (como `/users/{id}`) y otra específica (como `/users/emails`), **siempre debes poner la específica ARRIBA**.
> Si pones la del `{id}` primero, Laravel pensará que "emails" es un ID y nunca llegará a tu ruta específica.

### 2. El Modelo (El "Traductor")
**Archivo:** `app/Models/Product.php`
Laravel no habla SQL directamente en tu código; usa **Eloquent**.
El Modelo es una clase PHP que representa una tabla de tu base de datos.
- Clase `Product` ➡️ Tabla `products`
- Clase `User` ➡️ Tabla `users`

### 3. La Consulta (Eloquent)
En lugar de escribir `SELECT * FROM products`, escribes:
```php
$productos = Product::all(); // Trae todo
$producto = Product::find(1); // Trae el ID 1
$activos = Product::where('activo', 1)->get(); // Trae con condición
```

---

## ⚙️ ¿Qué hace Laravel "Bajo el Capó"?

Cuando tú escribes esa simple línea `return User::all();`, Laravel hace todo esto por ti:

### 1. Conexión Automática (Database Manager)
**Laravel:** Lee tu archivo `.env`, busca `DB_HOST`, `DB_PASSWORD`, etc., y crea la conexión PDO en un "Singleton" (una única conexión reutilizable) apenas arranca la aplicación.
**Manual:** Tendrías que escribir `new PDO(...)` en cada archivo.

### 2. Construcción de Query (Query Builder)
**Laravel:** Cuando escribes `User::where('id', '>', 5)`, Laravel no ejecuta nada todavía. Empieza a construir un objeto Query en memoria. Solo cuando llamas a `->get()` o `->all()`, compila ese objeto en SQL real: `SELECT * FROM users WHERE id > 5`.
**Manual:** Tendrías que concatenar textos con cuidado: `"SELECT * FROM " . $tabla . " WHERE..."`.

### 3. Hidratación de Modelos (Hydration)
**Laravel:** La base de datos devuelve datos crudos (arrays). Eloquent toma esos datos y crea una **instancia de la clase User** para cada fila. Esto te permite hacer cosas como `$user->save()` o `$user->notificar()`.
**Manual:** Solo tendrías arrays "tontos" sin métodos ni lógica.

### 4. Respuesta JSON Automática
**Laravel:** Cuando haces `return $usuarios;` en una ruta API, Laravel detecta que estás devolviendo un objeto o array. Automáticamente:
- Llama a `json_encode`
- Configura los headers (`Content-Type: application/json`)
- Maneja los códigos de estado HTTP (200 OK)
**Manual:** Tendrías que configurar los headers y codificar el JSON manualmente cada vez.

---

## 🗺️ Organización Recomendada

Para proyectos reales (no pruebas rápidas), no solemos poner la lógica en `routes/api.php`. Usamos **Controladores**.

**Estructura Ideal:**
1. **Ruta**: `Route::get('/users', [UserController::class, 'index']);`
   *(Solo define la URL)*
2. **Controlador**: `app/Http/Controllers/UserController.php`
   *(Recibe la petición y decide qué modelo llamar)*
3. **Modelo**: `app/Models/User.php`
   *(Habla con la base de datos)*

Esta separación hace que tu código sea ordenado y fácil de mantener cuando la aplicación crece.
