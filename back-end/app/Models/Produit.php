<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Marque;
use App\Models\Categorie;
use App\Models\Photos;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produit extends Model
{
    use HasFactory;


    public function marques()
    {
        return $this->belongsTo(Marque::class, 'marque_id', 'id');
    }
    public function categories()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id');
    }
    public function photos()
    {
        return $this->hasMany(Photos::class);
    }

    public function principalPhoto()
    {
        return $this->hasOne(Photos::class, 'produit_id')->where('is_principal', true);
}
    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);

    }
    protected $fillable = [
        'nom',
        'prix',
        'qte_stock',
        'reduction',
        'proddesc',
        'methodePayement',
        'categorie_id',
        'marque_id'
    ];
}
