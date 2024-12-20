<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    public function facture()
    {
        return $this->belongsTo(Facture::class);
    }
}
