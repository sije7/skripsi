<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApproveTransactionRequest;
use App\Http\Requests\CreateTransaction;
use App\Http\Requests\GetTransactions;
use App\Http\Requests\RejectTransactionRequest;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Crowdfunding;
use App\Models\User;

class TransactionController extends Controller
{
    public function getTransaction(GetTransactions $request){
        $data = $request->validated();
        $tempstatus = $request->status;
        $transactions = Transaction::where('status','=', $tempstatus)->get();
        foreach($transactions as $tr){
            $user = User::where('id','=',$tr->user_id)->first();
            $tr->username = $user->name;
            $tr->userRek = $user->no_req;
            $tr->userBank = $user->bank;
            $crowdfunding = Crowdfunding::where('id','=',$tr->crowdfunding_id)->first();
            $tr->title= $crowdfunding->title;
            $tr->no_rekening = $crowdfunding->no_rekening;
            $tr->nama_rekening = $crowdfunding->nama_rekening;
            $tr->bank = $crowdfunding->bank;
        }
      
        return compact('transactions');
    }

    public function createNewTransaction(CreateTransaction $request)
    {
        $data = $request->validated();
        $tr = new Transaction();
        $tr->fund = $request->Dana;
        $tr->user_id = $request->user_id;
        $tr->crowdfunding_id = $request->crowdfunding_id;
        $tr->status = 1;

        $fileName = $request->Gambar->getClientOriginalName('image');
        $path = $request->Gambar->storeAs('images', $fileName, 'public');
        $tr->image = '/storage/' . $path;
        $tr->save();

        return 'Pembayaran Berhasil Diajukan';
    }

    public function approveTransaction(ApproveTransactionRequest $request){
        $data = $request->validated();
        $transaction = Transaction::find($request->transaction_id);
        $crowdfunding = Crowdfunding::find($request->crowdfunding_id);

        $crowdfunding->fund += $transaction->fund;
        $transaction->status = 2;
        $crowdfunding->save();
        $transaction->save();

        return 'Approve Pembayaran Berhasil';
    }

    public function rejectTransaction(RejectTransactionRequest $request){
        $data = $request->validated();
        $transaction = Transaction::find($request->transaction_id);

        $transaction->status = 0;
        $transaction->save();

        return 'Reject Pembayaran Berhasil';
    }
}
