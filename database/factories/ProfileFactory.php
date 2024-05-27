<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'jenis_kelamin' => $this->jenis_kelamin,
            'umur' => $this->umur,
            'nomor_telepon' => $this->nomor_telepon,
            'role' => $this->role,
            'profile_image' => $this->profile_image,
            'no_req' => $this->no_req,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
