import { useState } from 'react';

export default function Welcome() {
    // 1. Definimos variables (lógica de JavaScript)
    const nombreUsuario = "Rubén Ojeda";
    const tareasPendientes = ["Instalar Laravel", "Configurar React", "Aprender Tailwind", "Rehacer Curriculum"];
    const fechaActual = new Date().toLocaleDateString();
    const [contador, setContador] = useState(0);

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">

            {/* 2. Mostramos variables simples usando { } */}
            <h1 className="text-4xl font-black text-indigo-600 uppercase">
                TaskHub de {nombreUsuario}
            </h1>

            <p className="text-slate-500 mt-2 font-medium">
                Hoy es: {fechaActual}
            </p>

            {/* 3. Listado dinámico (aquí es donde React brilla) */}
            <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-slate-800">Tareas de hoy:</h2>

                <ul className="space-y-3">
                    {tareasPendientes.map((tarea, index) => {
                        {/*Si una tarea contiene la palabra "Laravel", el texto salga de color azul (usando un ternario dentro del className).*/ }
                        return (
                            <li key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full" ></span>
                                <span className={tarea.includes("Laravel") ? "text-indigo-600 font-bold" : "text-slate-600"}>{tarea}</span>
                            </li>
                        );

                    })}
                </ul>

            </div>

            <div className="mt-10 flex gap-4">
                <button 
                    className={`px-6 py-2 rounded-lg transition ${contador === 10 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`} 
                    onClick={() => setContador(contador + 1)}
                >
                    {contador === 10 ? "¡Lista Llena!" : "Nueva Tarea"}
                </button>
            </div>
        </div >
    );
}