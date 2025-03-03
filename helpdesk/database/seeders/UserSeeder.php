<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuarios
        User::factory()->create([
            'num_employee' => 1,
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'num_employee' => 2,
            'name' => 'Support User',
            'email' => 'support@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'num_employee' => 3,
            'name' => 'Prevention User',
            'email' => 'prevention@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'num_employee' => 4,
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}