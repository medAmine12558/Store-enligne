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
   return(
    <div>
        <p>{values.nom}</p>
    </div>
   )
}