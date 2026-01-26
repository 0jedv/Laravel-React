export default function CardFirst({ id, nombre, email }) {
    return (
        <div className="card-first">
            <h1>{nombre}</h1>
            <p>{email}</p>
            <p>{id}</p>
        </div>
    );
}