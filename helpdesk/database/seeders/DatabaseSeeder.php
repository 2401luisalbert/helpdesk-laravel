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
        // 1. Crear roles y permisos
        $this->call(RolePermissionSeeder::class);

        // 2. Crear usuarios
        $this->call(UserSeeder::class);

        // 3. Asignar roles a los usuarios
        $this->call(AssignRolesSeeder::class);
    }
}