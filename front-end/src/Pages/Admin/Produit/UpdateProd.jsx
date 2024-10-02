import React, { useEffect, useState ,useRef } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function UpdateProd(){
    const {id}=useParams()
    const[cat,setCat]=useState()
    const[mrq,setMrq]=useState()
    const[mrq_default,setMrq_default]=useState()
    const[cat_default,setCat_default]=useState()
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
        
        setMrq(data.mrq)
        setCat(data.cat)
        if(data.produit.marques.marqlib && data.produit.categories.catlib){
          setMrq_default(data.produit.marques.marqlib)
        setCat_default(data.produit.categories.catlib)
        }
        
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
                return new File([blob], photo.image, {
                  type: 'image/jpeg',
                })
              }else{
                setValues(prevValues=>({
                  ...prevValues,
                  principale_photo:new File([blob], photo.image, {
                    type: 'image/jpeg',
                  })
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
          photos: photoUrls.filter((url) => url !== undefined), // Ne garder que les URL valides
        }));
      }
    
      fetch();
    }, [id]);
    



    if(!values){
        return <div>Loading...</div>;
    }
    if(cat)
    cat.map(
      c=>console.log(c)
    )
    const handelValue = (event) => {
      const key = event.target.id;
      const value = event.target.value;
  
      if (key == "photos") {
        const files = Array.from(event.target.files);
        setValues((prevValues) => ({
          ...prevValues,
          photos: [...prevValues.photos, ...files],
        }));
  
      } else if (key == 'principale_photo') {
        const files = Array.from(event.target.files);
        setValues(prevValues => ({
          ...prevValues,
          principale_photo: files[0]
        }))
      }
  
      else {
        setValues((prevValues) => ({
          ...prevValues,
          [key]: value,
        }));
      }
    };


    const handelSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      values.photos.forEach((photo) => {
        formData.append('photos[]', photo);
      })
      formData.append('principale_photo', values.principale_photo)
        formData.append('nom',values.nom)
        formData.append('prix',values.prix)
        formData.append('qte_stock',values.qte_stock)
        formData.append('reduction',values.reduction)
        formData.append('proddesc',values.proddesc)
        formData.append('methodePayement',values.methodePayement)
        formData.append('marque_id',values.marque_id)
        formData.append('categorie_id',values.categorie_id)
      axios.post(`http://localhost:8000/api/admin/updateproduit/${id}`, formData).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }



  
   return(
    <div className="container mx-auto px-4" style={{marginLeft:'260px',width:'390px',marginTop:'40px'}}>
         <form  style={{width:'580px'}} onSubmit={handelSubmit}>
         <div>
         <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
         <input
              type="text"
              id="nom"
              value={values.nom}
             onChange={handelValue}
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
              onChange={handelValue}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantite</label>
            <input
              type="number"
              id="qte_stock"
              value={values.qte_stock}
              onChange={handelValue}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="proddesc"
              value={values.proddesc}
              onChange={handelValue}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Methode du Payement</label>
            <input
              type="text"
              id="methodePayement"
              value={values.methodePayement}
              onChange={handelValue}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select onChange={handelValue} id="categorie_id">
            <option value={values.categorie_id}>{cat_default}</option>
            {cat && (
              cat.map((c,index)=>(
                <option key={index} value={c.id}>{c.catlib}</option>
              ))
            )}
          </select>

          
          <select onChange={handelValue} id="marque_id" >
            <option value={values.marque_id}>{mrq_default}</option>
           {mrq && (
            mrq.map((m,index)=>(
              <option key={index} value={m.id}>{m.marqlib}</option>
            ))
           )}
          </select>
          <label>Photo principale : </label><br />
          <input onChange={handelValue} type="file" id="principale_photo"  /><br />
          {values.principale_photo && (
            <div>
              <img src={URL.createObjectURL(values.principale_photo)} />
              <button
                  type="button"
                  onClick={() => {
                    setValues((values) => ({
                      ...values,
                      principale_photo: "",
                    }));
                  }}
                  className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 bg-white rounded-full"
                    style={{
                         zIndex: 1,
                     }}
                >
                  X
                </button>
            </div>
          )}
          <label>Photos : </label><br />
          <input onChange={handelValue} type="file" multiple id="photos"  />
          {values.photos && (values.photos.map(
            (photo,index) =>{
            
                return(
                  <div>
                  <img src={URL.createObjectURL(photo)} alt="photo"/>
                  <button
    type="button"
    onClick={() => {
      setValues((values) => ({
        ...values,
        photos: values.photos.filter((p, i) => i !== index),
      }));
    }}
    className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 bg-white rounded-full"
    style={{
      zIndex: 1, // make sure the button is on top of the image
    }}
  >
    X
  </button>
                </div>
                )
            
                  
                  
                
              
              
            } 
          ))}
          <input type="submit" value="submit" />
         </form>
    </div>
   )
}