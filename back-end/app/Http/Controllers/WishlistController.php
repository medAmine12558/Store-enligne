<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function addToWishlist($produitId)
    {
        $user = Auth::user();
        $produit = Produit::find($produitId);

        // Check if product already exists in the wishlist
        $existingWishlist = Wishlist::where('user_id', $user->id)->where('produit_id', $produitId)->first();

        if (!$existingWishlist) {
            // Create new wishlist entry
            Wishlist::create([
                'user_id' => $user->id,
                'produit_id' => $produit->id,
            ]);
        }

        return response()->json(['message' => 'Product added to wishlist.']);
    }

    // Remove product from wishlist
    public function removeFromWishlist($produitId)
    {
        $user = Auth::user();
        Wishlist::where('user_id', $user->id)->where('produit_id', $produitId)->delete();

        return response()->json(['message' => 'Product removed from wishlist.']);
    }

    // View user's wishlist
    public function viewWishlist()
    {
        $user = Auth::user();
        $wishlists = Wishlist::where('user_id', $user->id)->with('produit')->get();

        return response()->json($wishlists);
    }
}
