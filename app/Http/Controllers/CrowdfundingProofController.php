<?php

namespace App\Http\Controllers;

use App\Models\CrowdfundingProof;
use App\Http\Requests\StoreCrowdfundingProofRequest;
use App\Http\Requests\UpdateCrowdfundingProofRequest;

class CrowdfundingProofController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCrowdfundingProofRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCrowdfundingProofRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CrowdfundingProof  $crowdfundingProof
     * @return \Illuminate\Http\Response
     */
    public function show(CrowdfundingProof $crowdfundingProof)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CrowdfundingProof  $crowdfundingProof
     * @return \Illuminate\Http\Response
     */
    public function edit(CrowdfundingProof $crowdfundingProof)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCrowdfundingProofRequest  $request
     * @param  \App\Models\CrowdfundingProof  $crowdfundingProof
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCrowdfundingProofRequest $request, CrowdfundingProof $crowdfundingProof)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CrowdfundingProof  $crowdfundingProof
     * @return \Illuminate\Http\Response
     */
    public function destroy(CrowdfundingProof $crowdfundingProof)
    {
        //
    }
}
