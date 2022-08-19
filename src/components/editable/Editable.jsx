import React from 'react'

export default function Editable({id, editPokemonData, handleFormChange, handleCancelClick}) {
    return (
        <tr>
            <td>
                <p>{id}</p>
            </td>
            <td>
                <input 
                    type="text"
                    required="required"
                    placeholder='Enter a name'
                    name='name'
                    onChange={handleFormChange}
                    value={editPokemonData.name}
                />
            </td>
            <td>
                <input 
                    type="text"
                    required="required"
                    placeholder='Enter a weight'
                    name='weight'
                    onChange={handleFormChange}
                    value={editPokemonData.weight}
                />
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='Enter a height'
                    name='height'
                    onChange={handleFormChange}
                    value={editPokemonData.height}
                />
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='Enter a type'
                    name='types'
                    onChange={handleFormChange}
                    value={editPokemonData.types}
                />
            </td>
            <td>
                <button type='submit' >Save</button>
                &nbsp;&nbsp;
                <button onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}
