import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, CardActions } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image="https://via.placeholder.com/150" // Utilisez ici l'image réelle du produit
          alt={product.nom}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {product.prix} €
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Catégories : {product.categories.map(c => c.catlib).join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marques : {product.marques.map(m => m.marqlib).join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            Ajouter au panier
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
