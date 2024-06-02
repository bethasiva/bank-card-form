<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AccountInformation extends Model
{
    protected $table = 'account_information'; // Explicitly specify the table name if needed

    protected $fillable = [
        'card_number',
        'balance'
    ];
    public static function validate(array $data)
    {
        $rules = [
            'card_number' => 'required|string|digits:16'
        ];
        
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) throw ValidationException::withMessages($validator->errors()->toArray());
        
        // Return true only if validation passes without any errors
        return true;
    }

    public static function checkMatchingRecord(array $data)
    {
        try {
            // Find a record that matches all the fields
            return self::where('card_number', $data['card_number'])->first();
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
            $this->card_number = $data['card_number'];
            $this->balance = "1000000"; // To make sure top up works fine, adding some amount manually while saving the account details
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

