<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BankCard;
use App\Models\AccountInformation;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class TopUpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $accountInformation = (new AccountInformation())->saveData($request->all());
            $bankCard = (new BankCard())->saveData($request->all());
            $topUpAmount = round(floatval($request->top_up_amount), 2);
            $accountBalance = round(floatval($accountInformation->balance), 2);

            if($accountBalance > 0 && ($accountBalance - $topUpAmount) > 0){
                $remainingBalance = number_format((float)$accountBalance - $topUpAmount, 2, '.', '');
                $accountInformation->balance = $remainingBalance;;
                $accountInformation->save();
                return response()->json([
                    'message' => 'Top up successful'
                ], 201);
            } else {
                throw ValidationException::withMessages([
                    'balance' => 'Insufficient balance in your account'
                ]);    
            }
            
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ],422);
        } catch (\Exception $e) {
            // Handle database errors
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        } catch (\Throwable $th) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }
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
