<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        $roles = [
            'admin',
            'prevencion',
            'tecnico',
            'user'
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Create some basic permissions (customize as needed)
        $permissions = [
            'view dashboard',
            'create user',
            'edit user',
            'delete user',
            'manage roles',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Assign some permissions to roles (example)
        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo([
            'view dashboard',
            'create user',
            'edit user',
            'delete user',
            'manage roles',
        ]);
    }
}