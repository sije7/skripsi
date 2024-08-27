<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUsersRequest;
use App\Http\Requests\UpdateUsersRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUsersRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return response(new UserResource($user) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUsersRequest $request, User $user)
    {
        error_log($request->name);
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if ($request->hasFile('profile_image')) {
            if ($user->profile_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->profile_image));
            }

            $fileName = $request->file('profile_image')->getClientOriginalName();
            $path = $request->file('profile_image')->storeAs('images', $fileName, 'public');
            $data['profile_image'] = '/storage/' . $path;
        } else {
            // Jangan memperbarui field profile_image jika tidak ada file yang diunggah
            unset($data['profile_image']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if($user->profile_image){
            Storage::delete($user->profile_image);
        }
        $user->delete();

        return response("", 204);
    }

    public function getLembaga(){
        $lembaga = DB::table('users')->where('role', '=','lembaga')->where('status', 1)->get();
        return $lembaga;
    }

    public function getUsersToApprove(){
        $users = DB::table('users')->where('status', '=', 0 )->where('role','=','lembaga')->get();
        return compact('users');
    }
    public function approveUser($id){
        $user = User::find($id);
        $user->status = 1;

        $user->save();
        return 'User Berhasil Diapprove';
    }

    public function rejectUser($id){
        $user = User::find($id);
        $user->status = -1;

        $user->save();
        return 'User Telah Direject';
    }

    public function sendEmail(){
        $data = [
            'msg'=>'data npwp anda tidak valid'
        ];
        Mail::mailer('smtp')->to('danielson7632@gmail.com')->send(new EmailVerification($data));
        return 'Sent!';
    }
}
