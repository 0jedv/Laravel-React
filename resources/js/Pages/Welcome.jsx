import { useMemo } from 'react';
import { useForm, router } from '@inertiajs/react';
import TaskItem from '../Components/TaskItem';
import Stats from '../Components/Stats';

export default function Welcome({ tasks }) {
    // 1. Ahora usamos useForm de Inertia para manejar el input del formulario
    const { data, setData, post, processing, reset } = useForm({
        title: '',
    });

    // 2. Calculamos estadísticas en base a los props que vienen de la BD
import { useState, useMemo } from 'react';
import TaskItem from '../Components/TaskItem';
import Stats from '../Components/Stats';

export default function Welcome() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { total, completed, percentage };
    }, [tasks]);

    const handleAddTask = () => {
        post(route('tasks.store'), {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    };

    const handleClearCompleted = () => {
        router.delete(route('tasks.clearCompleted'), {
            preserveScroll: true
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 font-sans text-slate-800">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            Lista de tareas pendientes
                        </h1>
                        <p className="text-slate-500 text-sm">Organiza tu día de forma eficiente (BD Conectada)</p>
                    </div>
                </div>

                {/* Statistics */}
                <Stats
                    total={stats.total}
                    completed={stats.completed}
                    percentage={stats.percentage}
                />

                {/* Input Area */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={data.title ? "" : "Añadir nueva tarea"}
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        disabled={processing}
                    />
                    <button
                        onClick={handleAddTask}
                        disabled={data.title.trim().length === 0 || processing}
                        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? '...' : 'Añadir'}
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-3 mb-8">
                    {tasks.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                            <p>No hay tareas pendientes</p>
                            <p className="text-sm">¡Añade una para empezar!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                            />
                        ))
                    )}
                </ul>

        if (newTask.trim().length > 0) {
            setTasks([...tasks, {
                id: crypto.randomUUID(),
                title: newTask,
                completed: false
            }]);
            setNewTask("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleToggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleUpdateTask = (id, newTitle) => {
        if (newTitle.trim() === "") return;
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    const handleClearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 font-sans text-slate-800">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            Lista de tareas pendientes
                        </h1>
                        <p className="text-slate-500 text-sm">Organiza tu día de forma eficiente</p>
                    </div>
                </div>

                {/* Statistics */}
                <Stats
                    total={stats.total}
                    completed={stats.completed}
                    percentage={stats.percentage}
                />

                {/* Input Area */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={newTask ? "" : "Añadir nueva tarea"}
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                        onClick={handleAddTask}
                        disabled={newTask.length === 0}
                        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Añadir
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-3 mb-8">
                    {tasks.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                            <p>No hay tareas pendientes</p>
                            <p className="text-sm">¡Añade una para empezar!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={handleToggleTask}
                                onUpdate={handleUpdateTask}
                            />
                        ))
                    )}
                </ul>

                {/* Clear Button */}
                {stats.completed > 0 && (
                    <button
                        onClick={handleClearCompleted}
                        className="w-full py-3 text-red-500 font-bold border border-red-200 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Limpiar lista
                    </button>
                )}
            </div>
        </div>
    );
}