<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\CategorieController;
use App\Http\Controllers\Favorite;
use   App\Http\Controllers\ProduitController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/admin/showaddprod',[ProduitController::class,'showaddprod']);
Route::post('/admin/addcat',[CategorieController::class,'addcat']);
Route::post('/admin/addprod',[ProduitController::class,'addprod']);

Route::get('admin/getproduitupdate/{id}',[ProduitController::class,'updateprodpage']);
Route::get('admin/getphoto/{image}', function ($image) {
    $path = public_path('images/' . $image);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});
Route::post('admin/updateproduit/{id}', [ProduitController::class,'updateprod']);



//les routes de favoris ajouter,consulter,supprimer
Route::post('favorites/{productId}',[Favorite::class,'addToFavorites']);
Route::get('favorites',[Favorite::class,'getFavorites']);
Route::delete('/favorites/{productId}',[Favorite::class,'removeFromFavorites']);

