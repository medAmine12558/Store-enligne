<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
use App\Models\Photos;
use App\Models\Produit;

class ProduitController extends Controller
{

    public function addprod(Request $R){
        echo($R->input('nom')." ");
        echo($R->input('prix')." ");
        echo($R->input('qte_stock')." ");
        echo($R->input('reduction')." ");
        echo($R->input('proddesc')." ");
        echo($R->input('methodePayement')." ");
        echo($R->input('categorie_id')." ");
        echo($R->input('marque_id')." ");
        echo($R->file('principal_photo')->getClientOriginalName()." ");

        foreach($R->file('photos') as  $file){
            echo($file->getClientOriginalName());
            echo(" ");
        }

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
        //$photoDir = public_path('images');
        //$filename = Str::random(10) . '.' . $R->principal_photo->getClientOriginalExtension();
        //$R->principal_photo->move($photoDir, $filename);
        $prod->photos()->create([
            'image' => $R->file('principal_photo')->getClientOriginalName(),
            'is_principal' => true
        ]);
        foreach($R->file('photos') as $photosarray){
            //$filename = Str::random(10) . '.' . $photosarray->getClientOriginalExtension();
           //$photosarray->move($photoDir, $filename);
            $prod->photos()->create([
                'image' => $photosarray->getClientOriginalExtension()
            ]);

        }
        return response()->json("le produit est bien enregistrer ", 201);
    }
    
    public function rechercher(Request $request)
    {
        // Récupérer les filtres de recherche depuis la requête
        $name = $request->input('name');
        
        // Construire la requête de recherche de manière dynamique
        $query = Produit::query();

        // Appliquer les filtres si disponibles
        if ($name) {
            $query->where('nom', 'like', '%' . $name . '%')
                ->orWhereHas('categories', function($q) use ($name) {
                    $q->where('catlib', 'like', '%' . $name . '%');
                }
            )
            ->orWhereHas('marques', function($q) use ($name) {
                $q->where('marqlib', 'like', '%' . $name . '%');
            });
        }

        // Exécuter la requête et obtenir les résultats avec pagination
        $produits = $query->paginate(15);

        // Retourner les produits filtrés
        return response()->json([
            'produits' => $produits,
        ]);
    }
}
