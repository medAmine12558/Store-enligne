import React, { useState } from "react";
import axios from 'axios';



export default function Add({cat,mrq}){
    const [values,setValues]=useState({
        nom : "",
        prix : "",
        qte_stock : "",
        reduction: "",
        proddesc : "",
        methodePayement : "",
        marque_id : "",
        categorie_id : "",
        photos : [],
        principal_photo : "",
    })
    const handelValue = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        if (key == "photos") {
            const files = Array.from(event.target.files);
            setValues((prevValues) => ({
              ...prevValues,
              [key]: [...prevValues.photos, ...files],
            }));
          } else if (key == "principal_photo") {
            const files = Array.from(event.target.files);
            setValues((prevValues) => ({
              ...prevValues,
              [key]: files[0],
            }));
          } else {
            setValues((prevValues) => ({
              ...prevValues,
              [key]: value,
            }));
          }
      };
    
      console.log(values.principal_photo);
    const handelSubmit= async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        values.photos.forEach((photo) => {
          formData.append('photos[]', photo);
        })
        formData.append('principal_photo', values.principal_photo)
        formData.append('nom',values.nom)
        formData.append('prix',values.prix)
        formData.append('qte_stock',values.qte_stock)
        formData.append('reduction',values.reduction)
        formData.append('proddesc',values.proddesc)
        formData.append('methodePayement',values.methodePayement)
        formData.append('marque_id',values.marque_id)
        formData.append('categorie_id',values.categorie_id)
        await axios.post('http://localhost:8000/api/admin/addprod', formData).then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

    }
    return(
        <>
            <form onSubmit={handelSubmit}>
                <input type="text" id="nom" value={values.nom}  onChange={handelValue} placeholder="nom" />
                <br />
                <input type="numbre" step="any" value={values.prix} id="prix"  onChange={handelValue} placeholder="prix" />
                <br />
                <input type="numbre" id="qte_stock" value={values.qte_stock}  onChange={handelValue} placeholder="quantite stock"/>
                <br />
                <input type="numbre" step="any" id="reduction" value={values.reduction}  onChange={handelValue} placeholder="reduction"/>
                <br />
                <input type="text" id="proddesc" value={values.proddesc}  onChange={handelValue} placeholder="description"/>
                <br />
                <input type="text" id="methodePayement" value={values.methodePayement}  onChange={handelValue} placeholder="methode de payement"/>
                <br />
                <select id="categorie_id" onChange={handelValue} >
                <option value="" selected disabled>Choisissez une catégorie</option>
                {cat && cat.map( i => (
                    <option key={i.id} value={i.id} > {i.catlib} </option>
                ))}
                </select>
                <select id="marque_id" onChange={handelValue}>
                <option value="" selected disabled>Choisissez une marque</option>
                {mrq && mrq.map(i => (
                    <option key={i.id} value={i.id}>{i.marqlib}</option>
                ))}
                </select>


                <br />
                <label>Photo principale : </label><br />
                <input type="file" id="principal_photo" onChange={handelValue} />
                <div>
                {values.principal_photo &&(
                    <div>
                         <img src={URL.createObjectURL(values.principal_photo)} alt="photo" />
                         <button
                            type="button"
                            onClick={() => {
                            setValues((values) => ({
                            ...values,
                            principal_photo: "",
                            }));
                            }}
                        >
                            X
                        </button>

                    </div>

                )}
                </div>

                <br />
                <input type="file" multiple id="photos" onChange={handelValue} />
                <br />
                {values.photos && values.photos.length > 0 && (
    <div>
    {values.photos.map((photo, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={URL.createObjectURL(photo)} alt="photo" />
        <button
        type="button"
          onClick={() => {
            setValues((values) => ({
              ...values,
              photos: values.photos.filter((p, i) => i !== index),
            }));
          }}
        >
            X
        </button>
      </div>
    ))}
  </div>
)}
                <input type="submit" value="submit" />
            </form>
        </>
    )
}
