<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar caché de roles y permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Definir permisos
        $permissions = [
            'create ticket',
            'view ticket',
            'edit ticket',
            'delete ticket',
            'assign ticket',
            'manage users',
            'view dashboard',
        ];

        // Crear permisos solo si no existen
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
        }

        // Asignar permisos a roles
        $roles = [
            'admin' => $permissions,
            'support' => [
                'view ticket',
                'edit ticket',
                'assign ticket',
                'view dashboard',
            ],
            'prevention' => [
                'create ticket',
                'view ticket',
                'view dashboard',
            ],
            'user' => [
                'create ticket',
                'view ticket',
            ],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->syncPermissions($rolePermissions);
            }
        }
    }
}