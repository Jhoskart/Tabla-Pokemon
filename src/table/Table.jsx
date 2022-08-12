import { useState, useEffect } from 'react';
import { pokeInfo } from '../api/pedido';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Form from '../form/Form'


export const Table = () => {

    const [ pokemons, setPokemons ] = useState([])

    const [ currentPage, setCurrentPage ] = useState(0) //State para manejar la paginación
    const [ search, setSearch ] = useState(''); //State para manejar la busqueda

    useEffect(() => { 
        pokeInfo().then(e => setPokemons(e)); 
    }, [])

    ////////// Pokemons filtrados por busqueda y paginados //////////

    const filteredPokemons = () => {

        if( search.length === 0 ) return pokemons.slice(currentPage, currentPage + 5);

        // si el search no esta vacio, filtrara los pokemons por el search
        const filtered = pokemons.filter( poke => poke.name.includes( search ) );
        return filtered.slice( currentPage, currentPage + 5);
    }

    /////////////// Paginacion ///////////////

    const nextPage = () => {
        if ( pokemons.filter( poke => poke.name.includes( search ) ).length > currentPage + 5 )
            setCurrentPage( currentPage + 5 );
    }

    const prevPage = () => {
        if ( currentPage > 0 )
            setCurrentPage( currentPage - 5 );
    }

    /////////////// Busqueda y Eliminacion ///////////////

    const onSearchChange = ({ target }) => {
        setCurrentPage(0);
        setSearch( target.value );
    }
    
    const handleDeleteClick = (pokeid) => {
        const newPokemons = pokemons.filter(poke => poke.id !== pokeid)
        setPokemons(newPokemons)
    }

    return (
        <div className="mt-5">
            
            <h1 className="ms-auto">PokeTable</h1>
            <hr/>

            <Form pokemons={pokemons} setPokemons={setPokemons} />

            <input 
                type="text"
                className="mb-2 form-control "
                placeholder="Search a pokemon"
                value={ search }
                onChange={ onSearchChange }
            />

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 100 }}>ID</th>
                        <th style={{ width: 150 }}>Name</th>
                        <th>Picture</th>
                        <th>Weigh</th>
                        <th>Height</th>
                        <th>Types</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPokemons().map( ({ id, name, image, weight, height, types }) => (
                            <tr key={ id }>
                                <td> { id } </td>
                                <td> { name } </td>
                                <td>
                                    <img 
                                        src={ image }
                                        alt={ name }
                                        style={{ height: 75 }}
                                    />
                                </td>
                                <td>{weight}</td>
                                <td>{height}</td>
                                <td>{types}</td>
                                <td><button onClick={() => handleDeleteClick(id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <button 
                className="btn btn-secondary margin margin2 "
                onClick={ prevPage }
            >
                <AiOutlineArrowLeft />
            </button>
            &nbsp;
            <button 
                className="btn btn-secondary margin2 "
                onClick={ nextPage }
            >
                <AiOutlineArrowRight />
            </button>
        </div>
    )
}
