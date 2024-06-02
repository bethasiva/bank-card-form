<?php

namespace App\Http\Controllers;

use App\Models\BankCard;
use App\Models\AccountInformation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class BankCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(BankCard::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {        
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
