<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Proyecto;

// Rutas de Tareas (CRUD completo)
Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
Route::delete('/tasks/clear-completed', [TaskController::class, 'clearCompleted'])->name('tasks.clearCompleted'); // Antes de /{task} para evitar conflicto
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');


Route::get('/crear-proyecto', function () {
    
    // 2. Pedirle al modelo que cree uno nuevo
    $nuevo = Proyecto::create([
        'nombre' => 'App de Tareas',
        'descripcion' => 'Una app para organizar el día',
        'presupuesto' => 1200
    ]);

    return "¡Proyecto creado! ID: " . $nuevo->id;
});

Route::get('/users-view', function () {
    return Inertia::render('UserList');
});

Route::get('/projects-view', function () {
    return Inertia::render('ProyectsList');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
