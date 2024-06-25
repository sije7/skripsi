<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\SignupLembagaRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'user',
            'no_req' => $data['no_rekening'],
            'jenis_kelamin' => $data['jenis_kelamin'],
            'umur' => $data['umur'],
            'nomor_telepon' => $data['nomor_telepon'],
            'bank' => $data['bank'],
            'status' => 1,
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function signupLembaga(SignupLembagaRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
            'no_req' => $data['no_rekening'],
            'nomor_telepon' => $data['nomor_telepon'],
            'lokasi' => $data['lokasi'],
            'penanggung_jawab' => $data['penanggung_jawab'],
            'bank' => $data['bank'],
            'status' => 0,
            'deskripsi'=> $data['deskripsi'],
            'latitude'=>$data['latitude'],
            'longitude'=>$data['longitude'],
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        // $user = DB::table('users')->where('email','=',$request->email)->get();
        // error_log($user->status);
        if (!Auth::attempt($credentials)) {
            return response([
                'errors'=>[
                    'credentials' => ['email atau password salah']
                ],
                'message' => 'Email atau Password Salah'
            ], 422);
        }
        
        
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if($user->status !== 1 && $user->role === 'lembaga'){
            return response([
                'errors'=>[
                    'Account' => ['akun belum aktif']
                ],
                'message' => 'Akun belum aktif'
            ], 422);
        }
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
