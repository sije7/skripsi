<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use Illuminate\Support\Facades\Request;

class TransactionController extends Controller
{
    public function createNewTransaction(Request $request){
        error_log('connected');
    }
}
