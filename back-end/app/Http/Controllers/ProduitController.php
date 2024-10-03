<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
use App\Models\Photos;
use App\Models\Produit;
use Illuminate\Support\Str;
use App\Models\Categorie;
use App\Models\Marque;
use Illuminate\Support\Facades\File;


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

    public function updateprodpage($id){
        $prod=Produit::with('photos')->with('categories')->with('marques')->where('id',$id)->first();
        $cat=Categorie::all();
        $mrq=Marque::all();
        return response()->json(['produit'=>$prod,'cat'=>$cat,'mrq'=>$mrq]);
    }
    public function updateprod($id,Request $R){
        $prod = Produit::find($id);
        $prod->update([
            'nom' => $R->nom,
            'prix' => $R->prix,
            'qte_stock' => $R->qte_stock,
           'reduction' => $R->reduction,
            'proddesc' => $R->proddesc,
            'methodePayement' => $R->methodePayement,
            'categorie_id' => $R->categorie_id,
            'marque_id' => $R->marque_id
        ]);
        $produit_princ=Photos::where('produit_id',$prod->id)->where('is_principal',true)->first();
        $photoDir = public_path('images');
        File::delete($photoDir . '/' . $produit_princ->getOriginal('image'));
        foreach($prod->photos as $p){
            File::delete($photoDir . '/' . $p->getOriginal('image'));
        }
        Photos::where('produit_id',$prod->id)->delete();
        $filename = Str::random(10) . '.' . $R->file('principale_photo')->getClientOriginalExtension();
        $R->file('principale_photo')->move($photoDir, $filename);
        $prod->photos()->create([
            'image' => $filename,
            'is_principal'=>true
        ]);
        foreach($R->file('photos') as $photosarray){
            $filename = Str::random(10) . '.' . $photosarray->getClientOriginalExtension();
            $photosarray->move($photoDir, $filename);
            $prod->photos()->create([
                'image' => $filename
            ]);

        }
        return response()->json("le produit est bien modifier", 201);
    }

    public function getprods(){
        $prod = Produit::with('photos')->with('categories')->with('marques')->paginate(10); // 10 enregistrements par page
        return response()->json(['prod'=>$prod]);
    }

    public function delete_with_check_box(Request $r) {
        $checkeddelete = $r->input('checkeddelete');
        $photoDir = public_path('images');

        // Récupérer les produits avec leurs photos
        $prods = Produit::with('photos')->whereIn('id', $checkeddelete)->get();

        foreach ($prods as $prod) {
            // Boucle sur chaque photo du produit
            foreach ($prod->photos as $photo) {
                Log::debug($photo->image);
                File::delete($photoDir . '/' . $photo->image);  // Supprimer l'image du serveur
                $photo->delete();  // Supprimer l'enregistrement de la photo dans la base de données
            }

            // Supprimer le produit après avoir supprimé les photos
            $prod->delete();
        }

        return response()->json("les produits sont bien supprimés", 201);}




    public function rechercher(Request $request)
    {
        // Récupérer les filtres de recherche depuis la requête
        $name = $request->input('name');

        // Construire la requête de recherche de manière dynamique
        $query = Produit::with(['categories', 'marques']);

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
            'produits' => $produits->items(),
            'current_page' => $produits->currentPage(),
            'last_page' => $produits->lastPage(),
            'total' => $produits->total(),
        ]);


    }

      public function delete(Request $r){
        $prod_to_del=Produit::with('photos')->find($r->input('prod_to_del'));
        $photoDir = public_path('images');
        foreach($prod_to_del->photos as $i){
            File::delete($photoDir . '/' . $i->image);
            $i->delete();
        }
        $prod_to_del->delete();
        return response()->json('la photo est bien supprimer');
      }


}


