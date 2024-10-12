/* eslint-disable react/prop-types */
import ProductCard from './ProductCard';
import { Link } from '@mui/material';
import { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const CategoryProductList = ({ category }) => {

    const lastProducts = category.produits.slice(0, 8);

    const scrollElement = useRef(null);

    const scrollRight = () => {
        if (scrollElement.current) {
            const productCard = scrollElement.current.querySelector('.product-card');
            const productWidth = productCard ? productCard.offsetWidth : 300; // Default width is 300px
            scrollElement.current.scrollLeft += productWidth;
        }
    };


    const scrollLeft = () => {
        if (scrollElement.current) {
            const productCard = scrollElement.current.querySelector('.product-card');
            const productWidth = productCard ? productCard.offsetWidth : 300;
            scrollElement.current.scrollLeft -= productWidth;
        }
    };

    return (
        <div className="category-section ml-4 relative my-6 py-4">

            <Link href={`/category/${category.id}/${category.catlib}`} style={{ textDecoration: 'none' }}>
                <h2 className="text-2xl font-semibold py-4 px-5 text-black  ">
                    {category.catlib}
                </h2>
            </Link>

            {/* Scrollable product grid */}
            <div className="relative ">
                {/* Scroll buttons */}
                <button
                    className="absolute left-0 w-9 z-10 bg-gray-100 shadow-md rounded-full p-2 text-lg"
                    style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>

                <div
                    className="product-grid flex gap-4 overflow-x-scroll no-scrollbar"
                    style={{ scrollBehavior: 'smooth', width: '100%' }}
                    ref={scrollElement}
                >
                    {lastProducts && lastProducts.length > 0 ? (
                        lastProducts.map(produits => (
                            <div className="product-card" style={{ minWidth: '300px', maxWidth: '300px' }} key={produits.id}>
                                <ProductCard produits={produits} categorie={category.catlib} />
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <button
                    className="absolute right-0 w-9 z-10 bg-gray-100 shadow-md rounded-full p-2 text-lg"
                    style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default CategoryProductList;