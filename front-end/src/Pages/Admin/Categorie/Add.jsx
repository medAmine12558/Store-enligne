import React, { useState } from 'react';
import axios from 'axios';



export default function Add() {
    const [values, setValues] = useState({ // Form fields
        catlib: "",
    });

    // We will use function below to get values from inputs

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    // This function will send our form data to addcat function in CategorieController

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:8000/api/admin/addcat', values).then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }

    return (
        <>
            <h1>Create Post</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">libele:</label>
                <input type='text' id="catlib" value={values.catlib} onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
        </>
    )
}
