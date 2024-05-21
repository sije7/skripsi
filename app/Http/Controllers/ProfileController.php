<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function updateProfile(UpdateProfileRequest $request , $id)
    {
        error_log('test123');
        $user = User::find($id);
        error_log($request->name);
        error_log($user);
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if($request->file('umur'))
        {
            $data['umur'] = $request->file('umur');
        }

        if($request->file('profile_image'))
        {
            $fileName = $request->file('profile_image')->getClientOriginalName();
            $path = $request->file('profile_image')->storeAs('images', $fileName, 'public');
            $data['profile_image'] = '/storage/' . $path;
        }

        $user->update($data);

        return new UserResource($user);
    }
}
