<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CrowdfundingController;
use App\Http\Controllers\TransactionController;
use App\Models\Crowdfunding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController :: class , 'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController :: class , 'signup']);
Route::post('/login', [AuthController :: class , 'login']);


Route::post('/crowdfundings', [CrowdfundingController :: class, 'getCrowdfundings']);
Route::get('/crowdfunding/{id}', [CrowdfundingController :: class, 'getCrowdfunding']);
Route::post('/crowdfunding/request', [CrowdfundingController :: class, 'requestCrowdfunding']);
Route::post('/crowdfunding/approve/{id}', [CrowdfundingController :: class, 'approveCrowdfunding']);


Route::post('/crowdfunding/transaction/create', [TransactionController:: class,'createNewTransaction']);
