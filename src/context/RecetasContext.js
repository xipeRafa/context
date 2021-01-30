import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);


    const [busqueda2, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const { nombre, categoria} = busqueda2;


    const [ consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        if(consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const resultado = await axios.get(url);

                // console.log(resultado.data.drinks);
                guardarRecetas(resultado.data.drinks);
            }

            obtenerRecetas();
        }

    }, [busqueda2]);

    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas, // manda funciones para que evento las llame
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;