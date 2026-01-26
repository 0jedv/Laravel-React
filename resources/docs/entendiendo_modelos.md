# 🧠 ¿Por qué necesito el archivo `User.php`?

Cuando escribes `User::select(...)`, estás usando **Eloquent**, el ORM de Laravel. Para entender por qué necesitas el archivo PHP, hay que entender qué es un Modelo.

## 1. El Puente Invisible
Imagina que la Base de Datos es una habitación cerrada con llave donde están los datos.
- **La Tabla SQL (`users`)**: Es el archivador físico dentro de la habitación.
- **El Modelo PHP (`User.php`)**: Es el **mayordomo** que tiene la llave.

Tú (el programador) no entras a la habitación. Tú le pides cosas al mayordomo:
> *"Oye `User`, tráeme todos los emails."* (`User::select('email')->get()`)

Si despides al mayordomo (borras el archivo `User.php`), no hay nadie a quien pedirle los datos, aunque el archivador (la tabla) siga existiendo en la habitación.

## 2. ¿Cómo sabe `User.php` qué tabla mirar?
Por defecto, Laravel usa una convención de nombres en inglés:

| Clase PHP (Modelo) | Busca automáticamente la tabla... |
|---|---|
| `User` | `users` (plural, minúscula) |
| `Product` | `products` |
| `Categoria` | `categorias` |

Si tu tabla se llamara distinto (ej: `mis_usuarios`), tendrías que decírselo al mayordomo en el archivo:

```php
class User extends Model {
    protected $table = 'mis_usuarios'; // ¡Aviso! La tabla tiene otro nombre
}
```

## 3. En Resumen
Cuando haces:
```php
return User::select('email')->get();
```

1.  PHP busca la clase `User`.
2.  La clase `User` sabe que está conectada a la tabla `users`.
3.  La clase genera el SQL: `SELECT email FROM users`.
4.  La clase ejecuta la consulta y te devuelve los resultados.

**Conclusión**: Sin el archivo `User.php`, Laravel no sabe "quién" es responsable de esa tabla.
