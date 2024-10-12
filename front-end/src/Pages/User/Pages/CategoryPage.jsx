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

    const handlePageClick = (page) => {
        setCurrentPage(page); // Set the clicked page as the current page
    };

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

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="category-page">
            <h1 className="text-center text-2xl font-bold py-4 my-4"> {catlib}</h1>

            <div className="product-grid grid grid-cols-4 gap-4 py-4 px-2">
                {products.map(produit => (
                    <ProductCard
                        key={produit.id}
                        produits={produit}
                        categorie={produit.categorie_id} // Or other category data if needed
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls flex justify-center items-center  py-6 my-6 ">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                    className="bg-none text-amber-800 uppercase px-4 py-2 font-bold hover:text-amber-400"
                >
                    Précédent
                </button>

                {/* Render clickable page numbers */}
                <div className="page-numbers flex gap-2 mx-4">
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-4 py-2 rounded-full font-bold ${page === currentPage ? 'bg-amber-400 text-white hover:bg-amber-800' : 'bg-none text-amber-800 hover:text-amber-400'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className="bg-none text-amber-800 uppercase px-4 py-2 font-bold"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default CategoryPage;