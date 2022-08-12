import { useState, useEffect } from 'react';
import { pokeInfo } from '../api/PedidoPoke';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import validate from '../validate/validate';


export const Table = () => {

    const [ pokemons, setPokemons ] = useState([])

    const [ currentPage, setCurrentPage ] = useState(0) //State para manejar la paginación
    const [ search, setSearch ] = useState(''); //State para manejar la busqueda
    const [error, setError] = useState({}); //State para manejar los errores
    const [disabled, setDisabled] = useState(true); //state para deshabilitar el boton submit

    const [newPokemon, setNewPokemon] = useState({
        id: '',
        name: "",
        types: "",
        image: "",
        height: "",
        weight: ""
    })

    useEffect(() => {

        pokeInfo().then(e => setPokemons(e));

        if ( //Validacion habilitar el boton submit
            newPokemon.name.length > 0 &&
            newPokemon.name.length <= 10 &&
            isNaN(newPokemon.name) && 
            !error.hasOwnProperty("image") &&
            !error.hasOwnProperty("height") &&
            !error.hasOwnProperty("weight")
    ) {
      setDisabled(false); //si todo esta correcto se habilitara el boton submit
    } else {
      setDisabled(true); //si no se deshabilitara el boton submit
    };
    }, [error, disabled])

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

    /////////////// Busqueda ///////////////

    const onSearchChange = ({ target }) => {
        setCurrentPage(0);
        setSearch( target.value );
    }

    /////////////// Submit ///////////////
    
    const handleFormChange = (e) =>{
        e.preventDefault()
        setError(validate({ ...newPokemon, [e.target.name]: e.target.value })); //se valida el input
        setNewPokemon({
            ...newPokemon,
            [e.target.name]: e.target.value
        })
    }
    
    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const newPo = {
            id: pokemons.length + 1,
            name: newPokemon.name,
            types: newPokemon.types,
            image: newPokemon.image,
            height: newPokemon.height,
            weight: newPokemon.weight
        }
    
        const newPokemons = [...pokemons, newPo]
        setPokemons(newPokemons);
    
        setNewPokemon({
            name: "",
            types: "",
            image: "",
            height: "",
            weight: ""
        })
        
        e.target.reset();   
    }

    const handleDeleteClick = (pokeid) => {
        const newPokemons = pokemons.filter(poke => poke.id !== pokeid)
        setPokemons(newPokemons)
    }

    return (
        <div className="mt-5">
            
            <h1 className="ms-auto">PokeTable</h1>
            <hr/>

            <h2>New Pokemon</h2>
            <form onSubmit={handleFormSubmit} id="form" className='mb-4'>
                <input type="text" name='name' placeholder="Name" required="required" onChange={handleFormChange} value={newPokemon.name}/>
                {error.name && <p>{error.name}</p>}
                <input type="text" name='types' placeholder="Types" required="required" onChange={handleFormChange}  className="ms-2" value={newPokemon.types} />
                {error.types && <p>{error.types}</p>}
                <input type="text" name='weight' placeholder="Weight" required="required" onChange={handleFormChange} className="ms-2" value={newPokemon.weight} />
                {error.weight && <p>{error.weight}</p>}
                <input type="text" name='height' placeholder="Height" required="required" onChange={handleFormChange} className="ms-2" value={newPokemon.height} />
                {error.height && <p>{error.height}</p>}
                <input type="url" name='image' placeholder="Image" required="required" onChange={handleFormChange} className="ms-2" value={newPokemon.image} />
                {error.image && <p>{error.image}</p>}
                <button type="submit" disabled={disabled} className="ms-2 btn btn-primary mb-2">Add</button>
            </form>

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
