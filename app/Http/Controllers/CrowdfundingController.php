<?php

namespace App\Http\Controllers;

use App\Http\Requests\getCrowdfundingRequest;
use App\Http\Requests\RequestCrowdfunding;
use App\Models\Crowdfunding;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CrowdfundingController extends Controller
{
    public function getCrowdfundings(getCrowdfundingRequest $request)
    {
        $data = $request->validated();
        $tempStatus = explode(',', $request->status);
        $crowdfundings = Crowdfunding::whereIn('status', $tempStatus)->get();
        foreach ($crowdfundings as $c) {
            $c->progress = $c->fund / $c->target * 100;
            $c->progress = round($c->progress, 2);
            if ($c->progress > 100) {
                $c->progress = 100;
            };
            $user = DB::table('users')->where('id','=',$c->user_id)->first('name');
            $c->username = $user->name;
        }

        return compact('crowdfundings');
    }

    public function getCrowdfunding($id)
    {
        $crowdfunding = Crowdfunding::find($id);
        $crowdfunding->progress = $crowdfunding->fund / $crowdfunding->target * 100;
        $crowdfunding->progress = round($crowdfunding->progress, 2);
        if ($crowdfunding->progress > 100) {
            $crowdfunding->progress = 100;
        };
        $username = User::where('id','=', $crowdfunding->user_id);
        $crowdfunding->username = $username;

        return compact('crowdfunding');
    }

    public function requestCrowdfunding(RequestCrowdfunding $request)
    {
        $data = $request->validated();

            $crowdfunding = new Crowdfunding();
            $crowdfunding->title = $request->Judul;
            $crowdfunding->description = $request->Deskripsi;
            $crowdfunding->target = $request->Dana;
            $crowdfunding->user_id = $request->user_id;
            $crowdfunding->deadline = $request->Deadline;
            $crowdfunding->location = $request->Lokasi;
            $crowdfunding->no_rekening = $request->NomorRekening;
            $crowdfunding->nama_rekening = $request->NamaRekening;
            $crowdfunding->bank = $request->Bank;
    
            $fileName = $request->Gambar->getClientOriginalName('image');
            $path = $request->Gambar->storeAs('images', $fileName, 'public');
            $crowdfunding->image = '/storage/' . $path;

            $crowdfunding->save();
            return 'Request Galangdana Berhasil';
    }

    public function approveCrowdfunding($id){
        $crowdfunding = Crowdfunding::find($id);
        $crowdfunding->status = 1;
        $crowdfunding->save();
        return 'Approve Galangdana Berhasil';
    }

}
