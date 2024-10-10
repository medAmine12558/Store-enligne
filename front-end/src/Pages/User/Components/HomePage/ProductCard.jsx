/* eslint-disable react/prop-types */
//import { Link } from '@mui/material';
import { AiOutlineShoppingCart } from "react-icons/ai";
import PriceSection from "./PriceSection";


const ProductCard = ({ produits, categorie}) => {

    return (
        <div className="product-card border border-gray-200 font-lato ">
            <div className="text-center border-b border-gray-200">
            {produits.principalPhoto && (
                    <img
                        src={produits.principalPhoto.image}
                        alt={produits.nom}
                        className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                )}
            </div>
            <div className="px-8 pt-4">
                <p className="text-gray-500 text-[14px] font-medium dark:text-white">
                {categorie}
                </p>
                {/* <Link
                    className="font-semibold hover:underline dark:text-white"
                    href={route('produit.show', produits.id)}
                >
                    {produits.nom}
                </Link> */}
                <p>{produits.nom}</p>
            </div>

            <div className="flex items-center justify-between px-4 py-2 ">
                <PriceSection reduction={produits.reduction} prix={produits.prix} />
                
            </div>
            
            <div className="justify-center">
            <button
                    type="button"
                    className="flex items-center space-x-2 px-1 py-2 hover:bg-amber-800 text-white rounded bg-amber-400 w-11/12 mx-2 my-1 "
                    //onClick={addCart}
                    data-test="add-cart-btn"
                >
                    <AiOutlineShoppingCart className="w-1/4"/>
                    <span>ADD TO CART</span>
                </button>
                </div>

        </div>
    );
};

export default ProductCard;