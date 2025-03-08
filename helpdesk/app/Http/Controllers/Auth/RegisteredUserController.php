<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        $roles = Role::all(['id', 'name']);
        return Inertia::render('auth/register', [
            'roles' => $roles,
        ]);
    }

    public function store(RegisterUserRequest $request): RedirectResponse
    {
        
        try {
            // Debug: Verificar datos validados
            $validatedData = $request->validated();
            
            // Debug: Verificar búsqueda de rol
            $roleId = $validatedData['role'];
            
            // Verificar si el rol se está enviando como ID
            $role = Role::where('id', $roleId)->first();
            
            // Debug: Verificar si se encontró el rol
            if (!$role) {
                return back()->withErrors(['role' => 'El rol seleccionado no existe.'])->withInput();
            }
            
            // Crear usuario
            $user = User::create([
                'name' => $validatedData['name'],
                'last_name' => $validatedData['last_name'],
                'last_name2' => $validatedData['last_name2'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'num_employee' => $validatedData['num_employee'],
            ]);
            
            // Asignar rol
            $user->assignRole($role->name);
            
            // Verificar roles asignados
            $assignedRoles = $user->getRoleNames();
            
            // Evento de registro
            event(new Registered($user));
            
            // Redirigir sin iniciar sesión
            return redirect()->route('dashboard')->with('success', 'Usuario registrado exitosamente');
        } catch (\Exception $e) {
            
            return back()->withErrors(['general' => 'Error al registrar usuario: ' . $e->getMessage()])->withInput();
        }
    }
}