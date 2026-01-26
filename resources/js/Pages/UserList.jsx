import { useEffect, useState } from 'react';
import CardFirst from '@/Components/CardFirst'; // Importamos tu componente
import '../../css/cards.css'; // Importamos tus estilos

export default function UserList() {
    // 1. Estado para guardar los usuarios
    const [users, setUsers] = useState([]);

    // 2. Efecto para cargar los datos cuando se monta el componente
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users')
            .then(response => response.json())
            .then(data => {
                console.log("Datos cargados:", data); // Para ver en consola
                setUsers(data);
            })
            .catch(error => console.error("Error cargando usuarios:", error));
    }, []); // El array vacío [] significa "ejecutar solo una vez al inicio"

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Usuarios (Desde Laravel API)</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* 3. Mapeamos el array de usuarios para crear una Card por cada uno */}
                {users.map((user) => (
                    <CardFirst
                        key={user.id}          // React necesita una key única
                        id={user.id}           // Pasamos el ID
                        nombre={user.name}     // Pasamos user.name (BD) al prop nombre (Componente)
                        email={user.email}     // Pasamos el email
                    />
                ))}
            </div>
        </div>
    );
}
