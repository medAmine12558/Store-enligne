<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    public function produits(){
        return $this->belongsTo(Produit::class);
    }
    protected $fillable = [
        'image',
        'is_principal'];
}
