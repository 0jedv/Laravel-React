<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'tasks' => Task::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Task::create([
            'title' => $request->title,
            'completed' => false
        ]);

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($request->only('title', 'completed'));

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }

    public function clearCompleted()
    {
        Task::where('completed', true)->delete();
        return back();
    }
}
