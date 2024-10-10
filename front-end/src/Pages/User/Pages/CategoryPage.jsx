import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Components/HomePage/ProductCard';
import { useParams } from 'react-router-dom'; // To get the category ID from the URL

const CategoryPage = () => {
    const { id, catlib } = useParams(); // Get category ID from the URL
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch products for this category when the component loads or page changes
        axios.get(`http://localhost:8000/api/categories/${id}/products?page=${currentPage}`)
            .then(response => {
                setProducts(response.data.data); // Set the products for the current page
                setTotalPages(response.data.last_page); // Set the total number of pages
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, [id, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="category-page">
            <h1 className="text-center text-2xl font-bold"> {catlib}</h1>

            <div className="product-grid grid grid-cols-4 gap-4">
                {products.map(produit => (
                    <ProductCard
                        key={produit.id}
                        produits={produit}
                        categorie={produit.categorie_id} // Or other category data if needed
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls flex justify-between mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoryPage;