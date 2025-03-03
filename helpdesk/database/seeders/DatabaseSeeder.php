<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Crear roles
        $this->call(RoleSeeder::class);

        // 2. Crear permisos y asignarlos a roles
        $this->call(RolePermissionSeeder::class);

        // 3. Crear usuarios
        $this->call(UserSeeder::class);

        // 4. Asignar roles a los usuarios
        $this->call(AssignRolesSeeder::class);
    }
}