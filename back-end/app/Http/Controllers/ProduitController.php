<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
use App\Models\Photos;
use App\Models\Produit;
use Illuminate\Support\Str;
use App\Models\Categorie;
use App\Models\Marque;


class ProduitController extends Controller
{
    public function showaddprod(){
        $cat=Categorie::all();
        $mrq=Marque::all();
        return response()->json(['cat'=>$cat,'mrq'=>$mrq]);
    }
    public function addprod(Request $R){

        $prod=Produit::create([
            'nom'=>$R->input('nom'),
            'prix'=>$R->input('prix'),
            'qte_stock'=>$R->input('qte_stock'),
            'reduction'=>$R->input('reduction'),
            'proddesc'=>$R->input('proddesc'),
            'methodePayement'=>$R->input('methodePayement'),
            'categorie_id'=>$R->input('categorie_id'),
            'marque_id'=>$R->input('marque_id')
        ]);

        $photoDir = public_path('images');
        $filename = Str::random(10) . '.' . $R->file('principal_photo')->getClientOriginalExtension();
        $R->file('principal_photo')->move($photoDir, $filename);

        $prod->photos()->create([
            'image' =>$filename,
            'is_principal' => true
        ]);

        foreach($R->file('photos') as $photosarray){
            $filename = Str::random(10) . '.' . $photosarray->getClientOriginalExtension();
            $photosarray->move($photoDir, $filename);
            $prod->photos()->create([
                'image' =>$filename
            ]);
        }

        return response()->json("le produit est bien enregistrer ", 201);
    }
    public function a($id){

        $prod=Produit::with('photos')->with('categories')->with('marques')->where('id',$id)->first();
        return response()->json(['produit'=>$prod,'photo_principal'=>"amine"]);
    }
}
