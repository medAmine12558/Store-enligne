<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categorie;
use App\Models\Produit;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

class CategorieController extends Controller
{
    // public function index()
    // {
    //     $categories = Categorie::with('produits')->get(); // Fetch categories with products
    //     return Inertia::render('Home', [
    //         'categories' => $categories,
    //         'canLogin' => Route::has('login'),
    //         'canRegister' => Route::has('register')
    //     ]);
    // }

    public function getCategoriesWithProducts()
{
    $categories = Categorie::with(['produits' => function ($query) {
        // Get the latest product for each category
        $query->latest()->take(10)->with(['principalPhoto' => function ($query) {
            $query->select('produit_id', 'image'); // Select the relevant fields from the photo table
        }]);
    }])
    ->select('id', 'catlib') // Select category name
    ->get();

    // Transform the response to the desired format
    $formattedCategories = $categories->map(function ($category) {
        return [
            'id' => $category->id,
            'catlib' => $category->catlib,
            'produits' => $category->produits->map(function ($produit) {
                return [
                    'id' => $produit->id,
                    'nom' => $produit->nom,
                    'prix' => $produit->prix,
                    'reduction' => $produit->reduction,
                    'categorie_id' => $produit->categorie_id,
                    'principal_photo' => $produit->principalPhoto->image ?? null, // Get the principal photo image
                ];
            }),
        ];
    });

    return response()->json($formattedCategories);
}

public function getCategoryProducts($id)
{
    // Fetch products with pagination for the specified category
    // Fetch products of the category with only the principal photo
    $products = Produit::where('categorie_id', $id)
        ->with(['photos' => function ($query) {
            $query->where('is_principal', true); // Fetch only the principal photo
        }])
        ->paginate(16); // Adjust number per page

    // Format the response to include the principal photo only
    $formattedProducts = $products->map(function ($product) {
        return [
            'id' => $product->id,
            'nom' => $product->nom,
            'prix' => $product->prix,
            'reduction' => $product->reduction,
            'principal_photo' => $product->photos->isNotEmpty() ? $product->photos->first()->image : null,
        ];
    });

    return response()->json([
        'data' => $formattedProducts,
        'current_page' => $products->currentPage(),
        'last_page' => $products->lastPage(),
    ]);
}

    public function show(Categorie $categories)
    {
        // Load products associated with the category
        $categories->load('produits');

        // Pass the category and its products to the Inertia view
        return Inertia::render('CategoryPage', [
            'category' => $categories
        ]);
    }

      //ajouter une categorie
    public function addcat(Request $Request){
       Categorie::create([
            'catlib'=> $Request->catlib
        ]);
        return response()->json(['message'=>'cat est bien enregistrer'],201);
    }


    //afficher la page de modification
    public function uppage($id){
        $cat=Categorie::find($id);
        return Inertia::render('Categorie/Updatecat',['cat'=>$cat]);
    }


    //executer la modification
    public function up($id,Request $r){
        $cat=Categorie::find($id);
        $cat->update([
            'catlib' => $r->catlib
        ]);
        return response()->json("la categorie est bien modifier", 201);
    }


    //supp une cat
    public function delete($id){
        $cat=Categorie::find($id);
        $cat->delete();
        return response()->json('la categorie est supprimer avec succee', 200);

    }
    }
