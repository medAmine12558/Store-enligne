<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\CategorieController;
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

Route::delete('admin/deleteProdWithBox', [ProduitController::class,'delete_with_check_box']);

Route::delete('admin/deleteProd',[ProduitController::class,'delete']);

Route::get('admin/getprods',[ProduitController::class,'getprods']);

//home page routes 
Route::get('/categories-with-products', [CategorieController::class, 'getCategoriesWithProducts']);
Route::get('/categories/{id}/products', [CategorieController::class, 'getCategoryProducts']);



//les routes de favoris ajouter,consulter,supprimer



Route::middleware('auth')->group(function () {
    Route::post('wishlist/add/{produit}', [WishlistController::class, 'addToWishlist'])->name('wishlist.add');
    Route::post('wishlist/remove/{produit}', [WishlistController::class, 'removeFromWishlist'])->name('wishlist.remove');
    Route::get('wishlist/view', [WishlistController::class, 'viewWishlist'])->name('wishlist.view');
});

//recherche produit path
Route::get('/search',[ProduitController::class,'rechercher']);



Route::get('/test', function () {return "Ceci est une chaîne de caractères.";});


Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');


Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

