<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetDonationsRequest;
use App\Http\Requests\RequestDonationRequest;
use App\Models\Donation;
use App\Models\Item;
use App\Models\ProgressDonation;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonationController extends Controller
{
    public function getDonations(GetDonationsRequest $request)
    {
        $data = $request->validated();
        $donations = DB::table('donations')->where('status', '=', $request->status)->get();
        foreach ($donations as $d) {
            $d->progress_donation = DB::table('progress_donations')->where('donation_id', '=', $d->id)->get();
            $d->username = DB::table('users')->where('id', '=', $d->user_id)->value('name');
            $progress_tracker = 0;
            $progress_count = 0;
            foreach ($d->progress_donation as $pd) {
                $pd->item = DB::table('items')->where('id', '=', $pd->item_id)->get(['name', 'currency', 'subcategory_id'])->first();
                $d->sub_category[$progress_count] = DB::table('subcategories')->where('id', '=', $pd->item->subcategory_id)->value('name');
                if ($pd->status === 1) {
                    $progress_tracker++;
                }
                $progress_count++;
            }
            $d->progress = $progress_tracker * 100 / $progress_count;
            $d->progress = round($d->progress, 2);
            if ($d->progress > 100) {
                $d->progress = 100;
            }
        }
        return compact('donations');
    }

    public function getDonation($id)
    {
        $donation = DB::table('donations')->where('id', '=', $id)->first();
        $donation->progress_donation = DB::table('progress_donations')->where('donation_id', '=', $donation->id)->get();
        $donation->username = DB::table('users')->where('id', '=', $donation->user_id)->value('name');
        $progress_tracker = 0;
        $progress_count = 0;
        foreach ($donation->progress_donation as $pd) {
            $pd->item = DB::table('items')->where('id', '=', $pd->item_id)->get(['name', 'currency', 'subcategory_id'])->first();
            $donation->sub_category[$progress_count] = DB::table('subcategories')->where('id', '=', $pd->item->subcategory_id)->value('name');
            if ($pd->status === 1) {
                $progress_tracker++;
            }
            $progress_count++;
        }
        $donation->progress = $progress_tracker * 100 / $progress_count;
        $donation->progress = round($donation->progress, 2);
        if ($donation->progress > 100) {
            $donation->progress = 100;
        }
        return compact('donation');
    }

    public function updateDonationProgress(Request $request, $id)
    {
        $ids = explode(',', $request->progress_id);
        $statuses = explode(',', $request->progress_status);
        for ($x = 0; $x < count($ids); $x++) {
            $progress = ProgressDonation::find($ids[$x]);
            $progress->status = $statuses[$x];
            $progress->save();
        }
        return 'Update Progress Donasi Berhasil';
    }

    public function getSubCategories()
    {
        $subcategories = Subcategory::all();
        foreach ($subcategories as $s) {
            $s->items = DB::table('items')->where('subcategory_id', '=', $s->id)->get();
        }
        return compact('subcategories');
    }

    public function requestDonation(RequestDonationRequest $request)
    {
        $donation = new Donation();
        $donation->user_id = $request->Lembaga_id;
        $donation->pemohon_id = $request->Pemohon_id;
        $donation->deadline = $request->Deadline;
        $donation->status = 1;
        $donation->title = $request->Judul;
        $donation->description = $request->Deskripsi;
        $donation->location = $request->Lokasi;

        $fileName = $request->Gambar->getClientOriginalName('image');
        $path = $request->Gambar->storeAs('images', $fileName, 'public');
        $donation->image = '/storage/' . $path;
        $donation->save();
        
        $itemIds = explode(',', $request->Barang);
        $itemQty = explode(',',$request->Jumlah);

        for($i = 0; $i < count($itemIds); $i++){
            $pd = new ProgressDonation();
            $pd->item_id = $itemIds[$i];
            $pd->donation_id = $donation->id;
            $pd->status = 0;
            $pd->quantity = $itemQty[$i];
            $pd->save();
        }
        
        return 'Permohonan Donasi Berhasil';
    }

    public function approveDonation(Request $request){
        $donationId = $request->id;
        $donation = Donation::find($donationId);
        $donation->status = $request->status;
        $donation->save();

        return 'Approve Donasi Berhasil';

    }

    public function rejectDonation(Request $request){
        $donationId = $request->id;
        $donation = Donation::find($donationId);
        $donation->status = 0;
        $donation->save();

        return 'Reject Donasi Berhasil';
    }

}
