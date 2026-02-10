export default function Stats({ total, completed, percentage }) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total</p>
                <p className="text-2xl font-black text-slate-800">{total}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Completadas</p>
                <p className="text-2xl font-black text-indigo-600">{completed}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Progreso</p>
                <p className={`text-2xl font-black ${percentage === 100 ? 'text-green-500' : 'text-slate-800'}`}>
                    {percentage}%
                </p>
            </div>
        </div>
    );
}
