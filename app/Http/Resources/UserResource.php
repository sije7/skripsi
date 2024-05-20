<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
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
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),

        ];
    }
}
