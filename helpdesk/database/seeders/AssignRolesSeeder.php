<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AssignRolesSeeder extends Seeder
{
    public function run(): void
    {
        // Asignar roles a los usuarios
        $adminUser = User::where('email', 'admin@example.com')->first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }

        $prevencionUser = User::where('email', 'prevencion@example.com')->first();
        if ($prevencionUser) {
            $prevencionUser->assignRole('prevencion');
        }

        $tecnicoUser = User::where('email', 'tecnico@example.com')->first();
        if ($tecnicoUser) {
            $tecnicoUser->assignRole('tecnico');
        }
    }
}