<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuarios
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Prevencion User',
            'email' => 'prevencion@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Tecnico User',
            'email' => 'tecnico@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}