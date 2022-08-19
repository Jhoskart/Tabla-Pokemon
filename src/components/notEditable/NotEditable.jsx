import React from 'react'

export default function NotEditable({id, name, weight, height, types, image, handleDeleteClick, handleEditClick}) {
    return (
        <tr key={ id }>
            <td> { id } </td>
            <td> { name } </td>
            <td> <img src={image} alt="pokemon" /> </td>
            <td>{ weight }</td>
            <td>{ height }</td>
            <td>{ types }</td>
            <td><button onClick={() => handleDeleteClick(id)} className="btn btn-danger">Delete</button>
            &nbsp;&nbsp;
            <button onClick={(e) => handleEditClick(e, id)} className="btn btn-primary">Edit</button></td>
        </tr>
    )
}
