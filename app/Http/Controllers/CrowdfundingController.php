<?php

namespace App\Http\Controllers;

use App\Http\Requests\getCrowdfundingRequest;
use App\Http\Requests\RequestCrowdfunding;
use App\Models\Crowdfunding;
use App\Models\CrowdfundingAllocation;
use App\Models\CrowdfundingProof;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

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
            $user = DB::table('users')->where('id', '=', $c->user_id)->first('name');
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
        $username = User::where('id', '=', $crowdfunding->user_id);
        $crowdfunding->username = $username;

        return compact('crowdfunding');
    }

    public function requestCrowdfunding(RequestCrowdfunding $request)
    {
        $data = $request->validated();
        $fileName = $request->Gambar->getClientOriginalName('image');
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

        $allocation = explode(',', $request->Alokasi);
        $allocationFund = explode(',', $request->DanaAlokasi);

        for ($i = 0; $i < count($allocation); $i++) {
            $pd = new CrowdfundingAllocation();
            $pd->crowdfunding_id = $crowdfunding->id;
            $pd->allocation = $allocation[$i];
            $pd->fund = $allocationFund[$i];
            $pd->save();
        }
        return 'Request Galangdana Berhasil';
    }

    public function approveCrowdfunding($id)
    {
        $crowdfunding = Crowdfunding::find($id);
        $crowdfunding->status = 1;
        $crowdfunding->save();
        return 'Approve Galangdana Berhasil';
    }

    public function rejectCrowdfunding($id)
    {
        $crowdfunding = Crowdfunding::find($id);
        $crowdfunding->status = -1;
        $crowdfunding->save();
        return 'Reject Galangdana Berhasil';
    }

    public function getAllocation($id)
    {
        $allocations = CrowdfundingAllocation::where('crowdfunding_id', '=', $id)->get();
        return compact('allocations');
    }

    public function uploadRealisasi(Request $request)
    {
        $id = $request->id;
        error_log($request->file('images')[0]->getClientOriginalName('image'));
        foreach ($request->file('images') as $image) {
            $r = new CrowdfundingProof();
            $r->crowdfunding_id = $id;

            $fileName = $image->getClientOriginalName('image');
            $path = $image->storeAs('images', $fileName, 'public');
            $r->image = '/storage/' . $path;

            $r->save();
        }
        return 'Upload Realisasi Berhasil';
    }

    public function getProofs($id){
        $proofs = CrowdfundingProof::where('crowdfunding_id','=',$id)->get();
        return compact('proofs');
    }
}
