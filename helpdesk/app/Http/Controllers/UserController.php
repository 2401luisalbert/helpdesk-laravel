<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Mostrar una lista de usuarios con sus roles.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Recuperar todos los usuarios con sus roles
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'), // Obtener solo los nombres de los roles
            ];
        });

        // Devolver los datos al frontend usando Inertia
        return Inertia::render('user/user-index', [
            'users' => $users,
        ]);
    }
}