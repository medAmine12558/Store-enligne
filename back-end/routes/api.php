<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\CategorieController;
use App\Http\Controllers\Favorite;
use   App\Http\Controllers\ProduitController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/admin/addcat',[CategorieController::class,'addcat']);
Route::post('/admin/addprod',[ProduitController::class,'addprod']);


//les routes de favoris ajouter,consulter,supprimer
Route::post('favorites/{productId}',[Favorite::class,'addToFavorites']);
Route::get('favorites',[Favorite::class,'getFavorites']);
Route::delete('/favorites/{productId}',[Favorite::class,'removeFromFavorites']);