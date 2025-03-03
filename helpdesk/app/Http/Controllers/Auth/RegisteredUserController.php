<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        $roles = Role::all(['id', 'name']); // Fetch all roles

        return Inertia::render('auth/register', [
            'roles' => $roles,
        ]);
    }

    public function store(RegisterUserRequest $request): RedirectResponse
{
    try {
        // Obtener datos validados
        $validatedData = $request->validated();

        // Verificar si el rol se está enviando como ID o como nombre
        $role = Role::where('id', $validatedData['role'])
            ->orWhere('name', $validatedData['role'])
            ->firstOrFail();

        // Crear usuario
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'num_employee' => $validatedData['num_employee'],
        ]);

        // Asignar rol
        $user->assignRole($role->name);

        // Evento de registro y autenticación
        event(new Registered($user));
       // Redirigir sin iniciar sesión
       return redirect()->route('dashboard')->with('success', 'Registro exitoso');


    } catch (\Exception $e) {
        Log::channel('registration')->error('❌ Error en el registro', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'request_data' => $request->all()
        ]);

        return back()->with('error', 'Registro exitoso');
    }
}

}