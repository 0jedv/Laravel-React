<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Proyecto;

Route::get('/users', function () {
    return User::all();
});


Route::get('/users/emails', function () {
    return User::select('email')->get();
});

Route::get('/users/{id}', function ($id) {
    return User::findOrFail($id);
});

Route::get('/proyects', function () {
    return Proyecto::all();
});
