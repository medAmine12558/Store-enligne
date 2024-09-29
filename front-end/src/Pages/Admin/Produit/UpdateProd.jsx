import React, { useEffect, useState ,useRef } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function UpdateProd(){
    const {id}=useParams()
    const [values,setValues]=useState({
      nom:'',
      prix:'',
      qte_stock:'',
      reduction:'',
      proddesc:'',
      methodePayement:'',
      marque_id:'',
      categorie_id:'',
      principale_photo:'',
      photos:[]
    })
    
    useEffect(() => {
      async function fetch() {
        console.log('hi from use effect 1');
        const rep = await axios.get(`http://localhost:8000/api/admin/getproduitupdate/${id}`);
        const data = rep.data;
    
        // Mise à jour de l'état avec les nouvelles valeurs
        setValues({
          nom: data.produit.nom,
          prix: data.produit.prix,
          qte_stock: data.produit.qte_stock,
          reduction: data.produit.reduction,
          proddesc: data.produit.proddesc,
          methodePayement: data.produit.methodePayement,
          marque_id: data.produit.marque_id,
          categorie_id: data.produit.categorie_id,
          principale_photo:'',
          photos: [], // Initialiser avec un tableau vide pour les photos
        });
    
        // Une fois que les valeurs sont mises à jour, récupérer les photos
        const photoUrls = await Promise.all(
          data.produit.photos.map(async (photo) => {
            try {
            const response = await axios.get(`http://localhost:8000/api/admin/getphoto/${photo.image}`, { responseType: 'blob' });
              const blob = response.data;
              if(photo.is_principal == 0){
                return URL.createObjectURL(blob);
              }else{
                setValues(prevValues=>({
                  ...prevValues,
                  principale_photo: URL.createObjectURL(blob)
                }))
              }    
            } catch (error) {
              console.error(error);
              return null;
            }
           } 
            
          )
        );
    
        // Mise à jour des photos
        setValues((prevValues) => ({
          ...prevValues,
          photos: photoUrls.filter((url) => url !== null), // Ne garder que les URL valides
        }));
      }
    
      fetch();
    }, [id]);
    

useEffect(()=>{
  console.log(values)
},[values])

    if(!values){
        return <div>Loading...</div>;
    }

  
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="proddesc"
              value={values.proddesc}
            
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Methode du Payement</label>
            <input
              type="text"
              id="methodePayement"
              value={values.methodePayement}
           
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select id="categorie_id">
            <option key={1} value={values.categorie_id}>{}</option>
           
          </select>
          <select id="marque_id" >
            <option key={2} value={values.marque_id}>{}</option>
           
          </select>
          <label>Photo principale : </label><br />
          <input type="file" id="principal_photo"  /><br />
          {values.principale_photo && (
            <img src={values.principale_photo} />
          )}
          <label>Photos : </label><br />
          <input type="file" multiple id="photos"  />
          {values.photos && (values.photos.map(
            (photo) => <img src={photo} />
          ))}
          
         </form>
    </div>
   )
}