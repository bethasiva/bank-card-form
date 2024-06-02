<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BankCard extends Model
{
    protected $fillable = [
        'card_number',
        'expiry_month',
        'expiry_year',
        'cvv',
    ];

    public static function validate(array $data = [])
    {
       
        $rules = [
            'card_number' => 'required|string|digits:16',
            'expiry_month' => 'required|string|digits:2',
            'expiry_year' => 'required|string|digits:2',
            'cvv' => 'required|string|digits:3',
        ];
        
        $validator = Validator::make($data, $rules);

        $errors = $validator->errors()->toArray();
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $expiryMonth = intval($data['expiry_month']);
        $expiryYear = intval($data['expiry_year']);

        $currentYear = intval(date('y'));
        $currentMonth = intval(date('m'));

        if ($expiryYear < $currentYear || ($expiryYear == $currentYear && $expiryMonth <= $currentMonth)) {
            throw ValidationException::withMessages([
                'expiry_month' => 'The expiry date must be in the future.',
                'expiry_year' => 'The expiry date must be in the future.',
            ]);
        }

        return true;
    }
    
    public static function checkMatchingRecord(array $data)
    {
        try {
            return self::where('card_number', $data['card_number'])
                ->where('expiry_month', $data['expiry_month'])
                ->where('expiry_year', $data['expiry_year'])
                ->where('cvv', $data['cvv'])
                ->first();
        } catch (\Exception $e) {
            // Handle database errors
            throw new \RuntimeException('Database error: ' . $e->getMessage(), 0, $e);
        }
    }

    public function saveData(array $data)
    {
        try {
            self::validate($data);
            $matchingRecord = self::checkMatchingRecord($data);
            if ($matchingRecord) return $matchingRecord;
            $this->fill($data);
            $this->save();
            return $this;
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            // Handle database errors
            throw new \RuntimeException('Error saving data: ' . $e->getMessage(), 0, $e);
        }
    }

}

