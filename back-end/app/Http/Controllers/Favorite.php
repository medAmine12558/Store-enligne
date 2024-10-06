<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Favorite extends Controller
{
    //
    public function addToFavorites(Request $request,$productId){
        $favorites=session()->get('favorites',[]);

        if(!in_array($productId,$favorites)){
            $favorites[] =$productId;
            session()->put('favorites',$favorites);
        }
        return response()->json($favorites);
    }

    public function getFavorites(){
        dd(session()->all());
        $favorites = session()->get('favorites', []);
        return response()->json($favorites);
    }

    public function removeFromFavorites(Request $request,$productId){
        $favorites =session()->get('favorites',[]);
        $key = array_search($productId, $favorites);
        if($key!==false){
            unset($favorites[$key]);
            session()->put('favorites',$favorites);
        }
        return response()->json($favorites);
    }
}
