import { useState, useEffect, Fragment } from 'react';
import { pokeInfo } from '../../api/pedido';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Form from '../form/Form'
import NotEditable from '../notEditable/NotEditable';
import Editable from '../editable/Editable'


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

    /////////////// Editar Pokemon ///////////////

    const [editPokemon, setEditPokemon] = useState(null)

    const [editPokemonData, setEditPokemonData] = useState({
        name: "",
        types: "",
        height: "",
        weight: ""
    })

    const handleEditClick = (e, pokeid) => {
        e.preventDefault()
        setEditPokemon(pokeid)

        const formValues = {
            name: pokemons.find(poke => poke.id === pokeid).name,
            weight: pokemons.find(poke => poke.id === pokeid).weight,
            height: pokemons.find(poke => poke.id === pokeid).height,
            types: pokemons.find(poke => poke.id === pokeid).types,
        }

        setEditPokemonData(formValues)
    };

    const handleFormChange = (e) => {
        e.preventDefault()
        setEditPokemonData({
            ...editPokemonData,
            [e.target.name]: e.target.value
        })   
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newPokemons = pokemons.map(poke => {
            if(poke.id === editPokemon) {
                poke.name = editPokemonData.name
                poke.weight = editPokemonData.weight
                poke.height = editPokemonData.height
                poke.types = editPokemonData.types
            }
            return poke
        } )
        setPokemons(newPokemons)
        setEditPokemon(null)
    }

    const handleCancelClick = (e) => {
        e.preventDefault()
        setEditPokemon(null)
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
            <form onSubmit={handleFormSubmit}>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: 100 }}>ID</th>
                            <th style={{ width: 150 }}>Name</th>
                            <th>picture</th>
                            <th>Weigh</th>
                            <th>Height</th>
                            <th>Types</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPokemons().map( ({ id, name, weight, height, types, image }) => (
                                <Fragment>
                                    {editPokemon === id ? (
                                    <Editable id={id} editPokemonData={editPokemonData} handleFormChange={handleFormChange} handleCancelClick={handleCancelClick} /> ) : ( 
                                    <NotEditable key={id} id={id} name={name} weight={weight} height={height} types={types} image={image} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> 
                                    )} 
                                </Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </form>

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
