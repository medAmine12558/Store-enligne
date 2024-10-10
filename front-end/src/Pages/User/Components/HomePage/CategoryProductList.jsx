/* eslint-disable react/prop-types */
import ProductCard from './ProductCard';
import { Link } from '@mui/material';

const CategoryProductList = ({ category }) => {

    const lastProducts = category.produits.slice(-4);

    return (
        <div className="category-section ml-4">
            
            <Link href={`/category/${category.id}/${category.catlib}`} style={{ textDecoration: 'none' }}>
                <h2 className="text-2xl font-semibold py-4 text-black ">
                    {category.catlib}
                    </h2>
            </Link>
            <div className="product-grid grid grid-cols-4 gap-4">
                {lastProducts && lastProducts.length > 0 ? (
                    lastProducts.map(produits => (
                        <ProductCard key={produits.id} produits={produits} categorie={category.catlib} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default CategoryProductList;