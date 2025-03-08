<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user and assign role
        $admin = User::factory()->create([
            'num_employee' => 1,
            'name' => 'Admin User',
            'last_name' => 'Ramirez',
            'last_name2' => 'Perez',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');
       
        // Create a support user and assign role
        $support = User::factory()->create([
            'num_employee' => 2,
            'name' => 'Support User',
            'last_name' => 'Perez',
            'last_name2' => 'Santos',
            'email' => 'support@example.com',
            'password' => bcrypt('password'),
        ]);
        $support->assignRole('support');
      
        // Create a prevention user and assign role
        $prevention = User::factory()->create([
            'num_employee' => 3,
            'name' => 'Prevention User',
            'last_name' => 'Garcia',
            'last_name2' => 'Garcia',
            'email' => 'prevention@example.com',
            'password' => bcrypt('password'),
        ]);
        $prevention->assignRole('prevention');

        // Create a test user and assign role
        $user = User::factory()->create([
            'num_employee' => 4,
            'name' => 'Test User',
            'last_name' => 'Coronel',
            'last_name2' => 'Coronel',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('user');
    }
}