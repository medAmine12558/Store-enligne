import React, { useEffect, useState } from "react";
import axios from 'axios';
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import TextField from '@mui/material/TextField';
import './Updateprod.css';
import Button from '@mui/material/Button';



export default function Add(){
  const [cat, setCat] = useState();
  const [mrq, setMrq] = useState();
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
    useEffect(()=>{
      async function a(){
      //await axios.get('http://localhost:8000/api/admin/showaddprod').then((res)=>{setCat(res.data.cat)}).then((res)=>{setMrq(res.data.mrq)})
        const res=  await axios.get('http://localhost:8000/api/admin/showaddprod')
        const data= res.data
       setCat(data.cat)
       setMrq(data.mrq)
    }
      a()
      
    },[])
    if(!cat){
      return  <div>Loading...</div>

    }
    console.log(cat)
    
     


      //console.log(response.data)
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
         <div className="w-64 bg-gray-100 h-screen p-4" style={{ position: 'fixed', top: 0, left: 0}}>
                <SidebarAdmin />
            </div>
            <div className="container mx-auto px-4" style={{marginLeft:'260px',width:'390px',marginTop:'40px'}}>

            
            <form onSubmit={handelSubmit}>
              <div>
                <TextField
                  id="nom"
                  label="Nom du produit"
                  value={values.nom}
                  onChange={handelValue}
                />
              </div>
              <br />
              <div>
                <TextField
                id="prix"
                type="number"
                step="any"
                label="prix"
                value={values.prix}
                onChange={handelValue}
                />

              </div>
                <br />

                <div>
          <TextField
          id="qte_stock"
          type="number"
          label="Quantite"
          value={values.qte_stock}
          onChange={handelValue}
        />
          </div>          
                <br />
                <div>
          <TextField
          id="reduction"
          type="number"
          label="reduction"
          value={values.reduction}
          onChange={handelValue} />
          </div>  
          <br />
                <div>
          <TextField
          id="methodePayement"
          type="text"
          label="Methode du Payement"
          value={values.methodePayement}
          onChange={handelValue} />
          </div>            
              <br />
                <div>
          <TextField
          id="proddesc"
          type="text"
          label="description"
          value={values.proddesc}
          onChange={handelValue} />
          </div>
                <br />
              
                <select id="categorie_id" onChange={handelValue} className="block w-full pl-10 text-sm text-gray-700" style={{border:'1px black solid'}} >
                <option value="" selected disabled>Choisissez une catégorie</option>
                {cat && cat.map( i => (
                    <option key={i.id} value={i.id} > {i.catlib} </option>
                ))}
                </select>
                <select id="marque_id" onChange={handelValue} style={{border:'1px black solid'}} className="block w-full pl-10 text-sm text-gray-700" >
                <option value="" selected disabled>Choisissez une marque</option>
                {mrq && mrq.map(i => (
                    <option key={i.id} value={i.id}>{i.marqlib}</option>
                ))}
                </select>


                <br />
                <label>Photo principale : </label><br />
                <input type="file" id="principal_photo" onChange={handelValue} />
                <div className="relative mb-4" style={{position:'relative',width:'170 px'}}>
                {values.principal_photo &&(
                    <div  className="flex justify-center mb-4">
                         <img src={URL.createObjectURL(values.principal_photo)} alt="photo" className="w-48 h-48 object-cover rounded-md"/>
                         <button
                            type="button"
                            onClick={() => {
                            setValues((values) => ({
                            ...values,
                            principal_photo: "",
                            }));
                            }}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 bg-white rounded-full"
                    style={{
                         zIndex: 1,
                         position:'absolute'
                     }}
                        >
                            X
                        </button>

                    </div>

                )}
                </div>

                <br />
                <input type="file" multiple id="photos" onChange={handelValue} style={{display:'block'}}/>
                <br />
                {values.photos && values.photos.length > 0 && (
    <div>
    {values.photos.map((photo, index) => (
      <div key={index} className="relative mb-4" style={{display:'inline-block',marginLeft:'22px'}}>
        <img src={URL.createObjectURL(photo)} alt="photo" style={{display:'inline-block'}} className="w-48 h-48 object-cover rounded-md"/>
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
    ))}
  </div>
)}
                <Button type="submit" variant="contained">Valider</Button>
            </form>
            </div>
        </>
    )
}
