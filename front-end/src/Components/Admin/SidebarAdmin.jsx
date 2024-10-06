import React from "react";
import {Link} from 'react-router-dom';


export function SidebarAdmin() {
  return (
    <div className="w-64 bg-white h-screen shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600">FOZYR-STORE</h1>
      </div>
      <nav className="mt-6">
        <Link
          // assuming you have a route named 'products.list' in Laravel
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 flex items-center"
        >
          <i className="fas fa-th-large mr-3"></i>
          <span>Liste des produits</span>
        </Link>
        <Link
           // assuming you have a route named 'products.create' in Laravel
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 flex items-center"
        >
          <i className="fas fa-box-open mr-3"></i>
          <span>Ajouter un produit</span>
        </Link>
      </nav>
    </div>
  );
}
