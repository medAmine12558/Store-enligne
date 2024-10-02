import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import axios from 'axios';
import ProductCard from './Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/search');
      setProducts(response.data.produits);  // Récupère la liste des produits depuis l'API
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aucun produit disponible</p>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;
