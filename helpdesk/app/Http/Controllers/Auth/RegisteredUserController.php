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
        return Inertia::render('auth/register', compact('roles'));
    }

    public function store(RegisterUserRequest $request): RedirectResponse
    {
        try {
            $validatedData = $request->validated();
            $roleId = $validatedData['role'];

            $role = Role::findOrFail($roleId);

            $user = User::create([
                'num_employee' => $validatedData['num_employee'],
                'name' => $validatedData['name'],
                'last_name' => $validatedData['last_name'],
                'last_name2' => $validatedData['last_name2'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            $user->assignRole($role);
            event(new Registered($user));

            return redirect()->route('dashboard')
                ->with('success', 'Usuario registrado exitosamente');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al registrar usuario: ' . $e->getMessage());
        }
    }
}
