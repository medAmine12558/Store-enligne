import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function UpdateProd(){
    const {id}=useParams()
    const [prod,setProd]=useState(null)
    const [values,setValues]=useState(null)

    useEffect(()=>{
        async function fetch(){
            await axios.get(`http://localhost:8000/api/admin/getproduitupdate/${id}`).then((res)=>{
                setProd(res.data);
                setValues({
                    nom: res.data.produit.nom,
                    prix: res.data.produit.prix,
                    qte_stock: res.data.produit.qte_stock,
                    reduction: res.data.produit.reduction,
                    proddesc: res.data.produit.proddesc,
                    methodePayement: res.data.produit.methodePayement,
                    marque_id: res.data.produit.marque_id,
                    categorie_id: res.data.produit.categorie_id,
                })
            })
        };
        fetch();
    },[id]
    )
    if(!prod){
        return <div>Loading...</div>;
    }
    console.log(prod)
   return(
    <div className="container mx-auto px-4" style={{marginLeft:'260px',width:'390px',marginTop:'40px'}}>
         <form  style={{width:'580px'}}>
         <div>
         <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
         <input
              type="text"
              id="nom"
              value={values.nom}
             
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">Prix</label>
            <input
              type="number"
              step="any"
              id="prix"
              value={values.prix}
              
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantite</label>
            <input
              type="number"
              id="qte_stock"
              value={values.qte_stock}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
         </form>
    </div>
   )
}