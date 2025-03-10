<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $users = User::with('roles:id,name')->get(['id', 'num_employee', 'name', 'last_name', 'last_name2', 'email']);
        
        return Inertia::render('user/user-index', compact('users'));
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('users.index')->with('success', 'Usuario eliminado correctamente');
    }
}