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
            $crowdfunding->title = $request->judul;
            $crowdfunding->description = $request->deskripsi;
            $crowdfunding->target = $request->target;
            $crowdfunding->user_id = $request->user_id;
            $crowdfunding->deadline = $request->deadline;
            $crowdfunding->location = $request->lokasi;

            $fileName = $request->gambar->getClientOriginalName('image');
            $path = $request->gambar->storeAs('images', $fileName, 'public');
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

    public function payCrowdfunding(Request $request, $id){
        $crowdfunding = Crowdfunding::find($id);
        $crowdfunding->fund += $request->fund;
        $crowdfunding->save();
        return 'Pembayaran Berhasil, Terima Kasih Untuk Kebaikannya';
    }

}
