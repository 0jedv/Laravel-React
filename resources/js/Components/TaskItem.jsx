import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function TaskItem({ task }) {

export default function TaskItem({ task, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleToggle = () => {
        router.put(route('tasks.update', task.id), {
            completed: !task.completed
        }, {
            preserveScroll: true
        });
    };

    const handleUpdate = () => {
        if (editValue.trim() === "") {
            setEditValue(task.title);
            setIsEditing(false);
            return;
        }

        if (editValue !== task.title) {
            router.put(route('tasks.update', task.id), {
                title: editValue
            }, {
                preserveScroll: true,
                onSuccess: () => setIsEditing(false)
            });
        } else {
            setIsEditing(false);
        }
    const handleUpdate = () => {
        if (editValue.trim() === "") {
            setEditValue(task.title); // Revert to original if empty
        } else {
            onUpdate(task.id, editValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200 transition-all hover:shadow-md">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 cursor-pointer"
            />

            <div className="flex-1">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                        className="w-full px-2 py-1 text-slate-700 border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className={`block cursor-pointer select-none ${task.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}
                        title="Click to edit"
                    >
                        {task.title}
                    </span>
                )}
            </div>
        </li>
    );
}
