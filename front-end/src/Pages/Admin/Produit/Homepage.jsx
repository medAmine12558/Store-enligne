
import React from "react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useEffect } from "react";
import { useCallback } from "react";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import axios from 'axios';
import { DialogDelete } from "../../../Components/Admin/DialogDelete";

export default function Homepage(){
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogCheckBox, setOpenDialogCheckBox] = React.useState(false);
    const [product, setProduct] = React.useState({
        p:[],
        image:''
});
    const [checkeddelete,setCheckeddelete]=useState([])
    const [showdeletebtn,setShowdeletebtn]=useState(false)
    const [prod_to_del,setProd_to_del]=useState()
    const [imageSrc, setImageSrc] = useState();

    useEffect(()=>{
        
        const fetchdata=async()=>{
        try{
            
                const response=await axios.get('http://localhost:8000/api/admin/getprods')
                const data=response.data
                setProduct((prevProduct)=>({
                    ...prevProduct,
                    p:[]
                }))
                setProduct((prevProduct)=>({
                    ...prevProduct,
                    p:[...prevProduct.p,data]
                })
                    
                )
              if(product){
                
                  console.log('Photos : ', photoUrls);
              }
                
                  
                  // Filtrer les résultats pour éliminer les entrées `null` ou `undefined`
             
                  
                   
                  
            }
        catch(error){
            console.log(error)
        }
    }
        fetchdata()
    },[])
    useEffect(()=>{
        const fetchphoto=async()=>{
        const photoUrls = await Promise.all(
            product.p.map(async (i) => {
              // Retourner les promesses à partir du deuxième niveau
              return Promise.all(
                i.prod.data.map(async (i1) => {
                  if (i1.photos && i1.photos.length > 0) {
                    try {
                      // Récupérer l'image de l'API
                      const response = await axios.get(
                        `http://localhost:8000/api/admin/getphoto/${i1.photos[0].image}`,
                        { responseType: 'blob' }
                      );
                      const blob = response.data;
                      
                      // Créer un objet File avec le blob récupéré
                      return new File([blob], i1.photos[0].image, {
                        type: 'image/jpeg',
                      });
                    } catch (error) {
                      console.error('Erreur lors de la récupération de l\'image', error);
                      return null; // Renvoie null en cas d'erreur
                    }
                  }
                  return null; // Si aucune photo n'existe
                })
              );
            })
          );
          setProduct((prevProduct)=>({
            ...prevProduct,
            image:photoUrls
          }))
        }
        fetchphoto()
    },[product.p])
    
    const handel_Check_Box_Change=useCallback((id)=>{
        const is_checked=checkeddelete.includes(id);
        if(is_checked){
            setCheckeddelete(checkeddelete.filter((i)=>i != id))
        }else{
            setCheckeddelete([...checkeddelete,id]);
        }
    },[checkeddelete, setCheckeddelete])

    if(checkeddelete.length>0){
        console.log("-----------------------------")
        checkeddelete.map(i=>{
            console.log(i)

        })
    }

    const handel_Delete=()=>{
        axios.delete('http://localhost:8000/api/admin/deleteProdWithBox',  {data: { checkeddelete: checkeddelete }}).then((res)=>{
            console.log(res.data)
        })
    }

    const hundel_Delete_One=()=>{
        axios.delete('http://localhost:8000/api/admin/deleteProd',  {data: { prod_to_del: prod_to_del }}).then((res)=>{
            console.log(res.data)
        })
    }

    useEffect(()=>{
        if(checkeddelete.length>0){
            setShowdeletebtn(true)
        }else{
            setShowdeletebtn(false)
        }

    },[checkeddelete])

    if(!product){
        return <div>Loading...</div>
    }

  
  console.log(product)
   async function fetchphoto(p){
        try{
            if(p.is_principal==1){
                const response = await axios.get(`http://localhost:8000/api/admin/getphoto/${p.image}`, { responseType: 'blob' });
                const blob = response.data;
                const file= new File([blob], p.image, {
                    type: 'image/jpeg',
                })
                const url = URL.createObjectURL(file);
                return url;
            }
           
        }catch(error){
            console.log(error)
        }
    }
    if(!product){
       return <p>loding</p>
    }
    
    
  /* return(
    <>
    {product.image[0]?.map((i)=>(
        <img src={URL.createObjectURL(i)} alt="ok" />
    )
    )}
    </>
   )
   */
  console.log(product)
   return(
    
        <div className="flex-1 p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products</h2>
            <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center">
                    <i className="fas fa-filter mr-2"></i> Filter
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md">See All</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md">+ Add Product</button>
            </div>

            </div>
            <div  className="flex">
            <div className="ml-64 p-4">
            <table  style={{ display: 'inline-block' }} className="min-w-full bg-white">
            <thead>
                <tr>
                <th className="py-2 px-4 border-b">
                        {showdeletebtn &&(
                            <button onClick={()=>{setOpenDialogCheckBox(true) ;}}>supprimer</button>
                        )}
                        {openDialogCheckBox &&(
                            <DialogDelete
                            obj={'les produits selectioner'}
                            open={openDialogCheckBox}
                            onClose={() => setOpenDialogCheckBox(false)}
                            action={handel_Delete} />
                        )}
                        </th>
                        <th className="py-2 px-4 border-b">Product Name</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Marque</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
            {product.p.map((i, index0) => {
            return (  // Ajout du return ici
                i.prod.data.map((i1, index1) => {
                return (
                <tr key={index1}>
                    <td className="py-2 px-4 border-b">
                        <input type="checkbox" onChange={() => handel_Check_Box_Change(i1.id)} checked={checkeddelete.includes(i1.id)} />
                    </td>
                    <td className="py-2 px-4 border-b flex items-center">
                        {/* Ajouter du contenu ici, comme une image ou du texte */}
                        {product.image[0]?.map((i,index2)=>{
                            if(index2==index1){
                                return(
                                    <img src={URL.createObjectURL(i)} alt="ok"  className="w-10 h-10 rounded-full mr-2" />
                                )
                            }
                            
                        }
                        )}
                        {i1.nom}
                    </td>
                    <td className="py-2 px-4 border-b">{i1.categories &&(i1.categories.catlib)}</td>
                    <td className="py-2 px-4 border-b">{i1.prix} DHS</td>
                    <td className="py-2 px-4 border-b">{i1.marques &&(i1.marques.marqlib)}</td>
                    <td className="py-2 px-4 border-b text-blue-600">
                        <button onClick={() => { setOpenDialog(true); setProd_to_del(i1.id) }} style={{ display: 'inline-block', cursor: 'pointer' }}>
                            <MdDeleteForever />
                        </button>
                        <a style={{ display: 'inline-block', marginLeft: '5px', cursor: 'pointer' }}><FaPen /></a>
                    </td>
                </tr>
            );
        })
    );
})}

            </tbody>
            </table>
            </div>

            </div>
            {openDialog && (
            <DialogDelete
                obj={product.nom}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                action={hundel_Delete_One}
            />
            )
        }
        <div className="flex justify-between items-center mt-4">

        {product.p.map((l)=>{
             l.links?.map((link, index) => {
                if (link.label !== 'Next &raquo;') {
                return (
                    <button
                        key={index}
                        className={`px-4 py-2 ${link.active ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-md`}
                        onClick={() => Inertia.get(link.url)}
                    >
                        {link.label}
                    </button>
                );
                }
                return null; // This will not render the button for "Next »"
            })
        })
       }
        </div>
        </div>
    )
}
   