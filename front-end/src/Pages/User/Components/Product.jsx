import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, CardActions } from '@mui/material';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;  // Ne pas rendre si le produit n'est pas disponible
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image="https://via.placeholder.com/150" // Remplacez par une image réelle si disponible
          alt={product.nom}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.proddesc}
          </Typography>
          <Typography variant="h6" color="text.primary">
            Prix : {product.prix} €
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Réduction : {product.reduction} %
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantité en stock : {product.qte_stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Méthode de paiement : {product.methodePayement}
          </Typography>

          {/* Affichage de la catégorie et de la marque */}
          <Typography variant="body2" color="text.secondary">
            Catégorie : {product.categories ? product.categories.catlib : 'Non spécifié'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marque : {product.marques ? product.marques.marqlib : 'Non spécifié'}
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
