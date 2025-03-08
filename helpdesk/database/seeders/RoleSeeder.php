<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear permisos
        $permissions = [
            'create ticket',
            'view ticket',
            'edit ticket',
            'delete ticket',
            'assign ticket',
            'view dashboard',
            'manage users',
            'manage roles',
            'manage permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Definir roles con sus permisos
        $roles = [
            'admin' => [
                'create ticket',
                'view ticket',
                'edit ticket',
                'delete ticket',
                'assign ticket',
                'view dashboard',
                'manage users',
                'manage roles',
                'manage permissions',
            ],
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

        // Crear roles y asignar permisos
        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::create(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
        }
    }
}