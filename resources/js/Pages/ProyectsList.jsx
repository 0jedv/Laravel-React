import { useEffect, useState } from 'react';
import CardSecond from '@/Components/CardSecond';
import '../../css/cards.css';

export default function ProyectsList() {
    const [proyects, setProyects] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/proyects')
            .then(response => response.json())
            .then(data => {
                console.log("Datos cargados:", data);
                setProyects(data);
            })
            .catch(error => console.error("Error cargando proyectos:", error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Proyectos (Desde Laravel API)</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {proyects.map((proyect) => (
                    <CardSecond
                        key={proyect.id}
                        id={proyect.id}
                        nombre={proyect.nombre}     // CORREGIDO: 'nombre' viene de la BD
                        descripcion={proyect.descripcion} // CORREGIDO: 'descripcion'
                        presupuesto={proyect.presupuesto} // CORREGIDO: 'presupuesto'
                    />
                ))}
            </div>
        </div>
    );
}
