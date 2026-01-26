export default function CardSecond({ id, nombre, descripcion, presupuesto }) {
    return (
        <div className="card-second">
            <h1>{nombre}</h1>
            <p>{descripcion}</p>
            <p>{presupuesto}</p>
            <p>{id}</p>
        </div>
    );
}