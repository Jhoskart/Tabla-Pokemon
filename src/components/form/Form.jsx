import React, {useState, useEffect} from 'react'
import validate from '../../validate/validate'


export default function Form({ pokemons, setPokemons }) {

    const [error, setError] = useState({}); //State para manejar los errores
    const [disabled, setDisabled] = useState(true); //state para deshabilitar el boton submit

    const [newPokemon, setNewPokemon] = useState({
        id: '',
        name: "",
        types: "",
        //image: "",
        height: "",
        weight: ""
    })

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
            //image: newPokemon.image,
            height: newPokemon.height,
            weight: newPokemon.weight
        }
    
        const newPokemons = [...pokemons, newPo]
        setPokemons(newPokemons);
    
        setNewPokemon({
            name: "",
            types: "",
            //image: "",
            height: "",
            weight: ""
        })
        
        e.target.reset();   
    }

    useEffect(() => {

        if ( //Validacion habilitar el boton submit
            newPokemon.name.length > 0 &&
            newPokemon.name.length <= 10 &&
            // isNaN(newPokemon.name) && 
            // !error.hasOwnProperty("image") &&
            !error.hasOwnProperty("height") &&
            !error.hasOwnProperty("weight")
    ) {
      setDisabled(false); //si todo esta correcto se habilitara el boton submit
    } else {
      setDisabled(true); //si no se deshabilitara el boton submit
    };
    }, [error, disabled, newPokemon.name])

    return (
        <div>
            <h2>New Pokemon</h2>
            <form onSubmit={handleFormSubmit} id="form" className='mb-4'>
                <div className='d-flex'>
                    <div>
                        <input type="text" name='name' placeholder="Name" required="required" onChange={handleFormChange} value={newPokemon.name} autoComplete="off" require pattern='^[a-zA-Z]+$' title="Debes rellenar el campo Nombre"/>
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div>
                        <input type="text" name='types' placeholder="Types" required="required" onChange={handleFormChange}  className="ms-2" value={newPokemon.types} autoComplete="off" />
                        {error.types && <p>{error.types}</p>}
                    </div>
                    <div>
                        <input type="text" name='weight' placeholder="Weight" required="required" onChange={handleFormChange} className="ms-2" value={newPokemon.weight} autoComplete="off" />
                        {error.weight && <p>{error.weight}</p>}
                    </div>
                    <div>
                        <input type="text" name='height' placeholder="Height" required="required" onChange={handleFormChange} className="ms-2" value={newPokemon.height} autoComplete="off" />
                        {error.height && <p>{error.height}</p>}
                    </div>
                    <button type="submit" disabled={disabled} className="ms-2 btn btn-primary mb-2">Add</button>
                </div>
            </form>
        </div>
    )
}
