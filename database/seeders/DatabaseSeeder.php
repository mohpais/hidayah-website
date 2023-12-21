<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::factory()->create([
            'name' => 'Super Admin',
            'description' => '']);

        User::factory()->create([
            'name' => 'Moh Pais',
            'email' => 'super.admin@hidayahapp.com',
            'password' => Hash::make('Hidayahapp@2023'),
            'role_id' => 1
        ]);
    }
}
