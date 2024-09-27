<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categorie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::with('produits')->get(); // Fetch categories with products
        return Inertia::render('Home', [
            'categories' => $categories,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
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

    public function a(){
        return response()->json(['message'=>'cat est bien enregistrer'],201);
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
