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
        $this->call(RoleSeeder::class);
        
        // 2. Crear usuarios y asignarles roles
        $this->call(UserSeeder::class);
    }
}