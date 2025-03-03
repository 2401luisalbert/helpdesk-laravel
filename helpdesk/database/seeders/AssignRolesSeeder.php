<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class AssignRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        $adminUser = User::where('email', 'admin@example.com')->first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }

        // Support user
        $supportUser = User::where('email', 'support@example.com')->first();
        if ($supportUser) {
            $supportUser->assignRole('support');
        }

        // Prevention user
        $preventionUser = User::where('email', 'prevention@example.com')->first();
        if ($preventionUser) {
            $preventionUser->assignRole('prevention');
        }

        // Test user
        $testUser = User::where('email', 'test@example.com')->first();
        if ($testUser) {
            $testUser->assignRole('user');
        }

        // Log for debugging
        Log::info('Roles Assignment Completed', [
            'admin_role' => $adminUser ? $adminUser->hasRole('admin') : 'No admin user',
            'support_role' => $supportUser ? $supportUser->hasRole('support') : 'No support user',
            'prevention_role' => $preventionUser ? $preventionUser->hasRole('prevention') : 'No prevention user',
            'test_role' => $testUser ? $testUser->hasRole('user') : 'No test user',
        ]);
    }
}