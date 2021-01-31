import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const RecetasContext = createContext();

const RecetasProvider = (props) => {

/*      <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                buscarRecetas(busqueda); // 0.- submit llama las funciones intrucidas en useContext 
                guardarConsulta(true); }} > */

    const [recetas, guardarRecetas] = useState([]);
    const [consulta, guardarConsulta] = useState(false); //pasa a true cuando dan submit
    const [busqueda2, buscarRecetas] = useState({  //busqueda2 recibe la info de el estado busqueda
        nombre: '',
        categoria: ''
    });
    const { nombre, categoria} = busqueda2;

    useEffect(() => {
        if(consulta) {
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
                buscarRecetas, // manda funciones para que evento onSubmit las llame
                guardarConsulta }}>
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;