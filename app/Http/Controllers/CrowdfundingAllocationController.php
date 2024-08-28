<?php

namespace App\Http\Controllers;

use App\Models\CrowdfundingAllocation;
use App\Http\Requests\StoreCrowdfundingAllocationRequest;
use App\Http\Requests\UpdateCrowdfundingAllocationRequest;

class CrowdfundingAllocationController extends Controller
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
     * @param  \App\Http\Requests\StoreCrowdfundingAllocationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCrowdfundingAllocationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CrowdfundingAllocation  $crowdfundingAllocation
     * @return \Illuminate\Http\Response
     */
    public function show(CrowdfundingAllocation $crowdfundingAllocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CrowdfundingAllocation  $crowdfundingAllocation
     * @return \Illuminate\Http\Response
     */
    public function edit(CrowdfundingAllocation $crowdfundingAllocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCrowdfundingAllocationRequest  $request
     * @param  \App\Models\CrowdfundingAllocation  $crowdfundingAllocation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCrowdfundingAllocationRequest $request, CrowdfundingAllocation $crowdfundingAllocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CrowdfundingAllocation  $crowdfundingAllocation
     * @return \Illuminate\Http\Response
     */
    public function destroy(CrowdfundingAllocation $crowdfundingAllocation)
    {
        //
    }
}
