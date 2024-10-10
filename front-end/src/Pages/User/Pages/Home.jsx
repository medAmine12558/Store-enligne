import  {  useEffect, useState } from 'react';
import CategoryProductList from '../Components/HomePage/CategoryProductList';
import Slideshow from '../Components/HomePage/SlideShow';
import axios from 'axios';

export default function Home(){

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories-with-products');
                console.log(response.data); // Log the response to the console
                setCategories(response.data); // Set the categories state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    return(
        <>
    <Slideshow/>

    
        {Array.isArray(categories) && categories.length > 0 ? (
            categories.map(category => (
                <CategoryProductList
                    key={category.id}
                    category={category}
                />
            ))
        ) : (
            <p>Loading...</p>
        )}
    
</>
);
}


