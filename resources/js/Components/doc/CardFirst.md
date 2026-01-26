# Documentación del Componente: CardFirst.jsx

**Ubicación:** `resources/js/Components/CardFirst.jsx`

Este es un **Componente de Presentación** (o componente "tonto"). No sabe nada de bases de datos ni APIs. Su único trabajo es recibir datos y mostrarlos bonitos.

## 📥 Props (Parámetros de Entrada)

Este componente espera recibir 3 propiedades ("props") desde su padre:

1. **`nombre`**: El nombre del usuario a mostrar en el `<h1>`.
2. **`email`**: El correo electrónico a mostrar en el primer `<p>`.
3. **`id`**: El identificador del usuario a mostrar en el segundo `<p>`.

## 🎨 Estilos

Utiliza una clase CSS externa llamada `.card-first`, definida en `resources/css/cards.css`.

```css
.card-first {
    background-color: hwb(0 12% 26%); /* Color rojo oscuro */
    border-radius: 10px;
    padding: 20px;
    ...
}
```

## 📝 Ejemplo de Uso

Si quisieras usar este componente manualmente (sin bucles), lo harías así:

```jsx
<CardFirst 
    id={1} 
    nombre="Pepito Grillo" 
    email="pepito@disney.com" 
/>
```
