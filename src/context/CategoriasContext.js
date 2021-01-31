import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context  // a este se le añade .Provider
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => { //siempre lleva props

    // crear el state del Context
    const [categorias, guardarCategorias] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias}}>
            {props.children}   {/* props linea 8 para que esten disponibles en app y componentes */}
        </CategoriasContext.Provider>
    )
}
export default CategoriasProvider;// este lo importamos en el arbol de componentes