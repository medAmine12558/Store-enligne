import React, { useState } from 'react';
import axios from 'axios';

export default function Add() {
    const [values, setValues] = useState({
        catlib: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Faire une requête pour obtenir le cookie CSRF
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');

            // Faire la requête POST avec les données du formulaire
            const response = await axios.post('http://localhost:8000/api/admin/addcat', values);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }
    }

    return (
        <>
            <h1>Create Post</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Libellé:</label>
                <input type='text' id="catlib" value={values.catlib} onChange={handleChange} />
                <button type="submit">Créer</button>
            </form>
        </>
    );
}
