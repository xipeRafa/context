import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {
    const { categorias } = useContext(CategoriasContext);

    const { buscarRecetas, guardarConsulta } = useContext(RecetasContext );

    // 1.- lo esquito en el formulario se guarda en el estado busqueda el cual es llevado por la funcion buscarRecetas comunicado por el RecetasContext
    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });

     //datos en onChange de inputs en formulario se meten en busqueda
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                buscarRecetas(busqueda); // 0.- submit manda las funciones intrucidas en useContext
                guardarConsulta(true);
            }} >

            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="nombre"
                        onChange={obtenerDatosReceta}
                        className="form-control"
                        placeholder="Buscar por Ingrediente"/>
                </div>
                <div className="col-md-4">

                    <select className="form-control" name="categoria"onChange={obtenerDatosReceta}>
                        <option value="">
                            -- Selecciona Categoría --
                        </option>

                        {categorias.map(categoria => (
                        <option key={categoria.strCategory} value={categoria.strCategory}>
                                    {categoria.strCategory} 
                        </option>))}
                    </select>

                </div>

                <div className="col-md-4">
                <input type="submit" className="btn btn-block btn-primary" value="Buscar Bebidas" />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;