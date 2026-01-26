# Documentación del Componente: UserList.jsx

**Ubicación:** `resources/js/Pages/UserList.jsx`

Este componente actúa como una **Página Contenedora**. Su responsabilidad principal no es mostrar un diseño bonito por sí mismo, sino **obtener los datos (Lógica)** y organizar a los componentes hijos que mostrarán la información (Presentación).

## 🧠 Lógica del Componente

### 1. Estado (`useState`)
```javascript
const [users, setUsers] = useState([]);
```
- **`users`**: Es la variable donde guardamos la lista de usuarios. Inicialmente está vacía (`[]`).
- **`setUsers`**: Es la función "interruptor" que usamos para actualizar esa lista. Cuando la llamamos, React sabe que debe volver a pintar la pantalla con los nuevos datos.

### 2. Efecto (`useEffect`) - La Petición
```javascript
useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users')
        ...
}, []);
```
- Este bloque le dice a React: *"Oye, cuando termines de cargar esta página por primera vez, ejecuta este código"*.
- Hacemos la petición a nuestra API de Laravel.
- Cuando la API responde, usamos `setUsers(data)` para guardar los datos.

### 3. Renderizado (`map`) - El Bucle
Esta es la parte clave para convertir un JSON en elementos visuales:

```javascript
{users.map((user) => (
    <CardFirst 
        key={user.id}
        id={user.id}
        nombre={user.name}
        email={user.email}
    />
))}
```

- **`map`**: Es como un bucle `foreach`. Recorre cada objeto dentro del array `users`.
- **`<CardFirst />`**: Por cada usuario, creamos una instancia de tu tarjeta.
- **Props**: Pasamos los datos del usuario (`user.name`, `user.email`) a las "props" que espera tu componente (`nombre`, `email`).

## 🔗 Relación con otros archivos

- **Importa**: `Components/CardFirst.jsx` (Tu tarjeta visual).
- **Es llamado por**: `routes/web.php` (Cuando visitas `/users-view`).
