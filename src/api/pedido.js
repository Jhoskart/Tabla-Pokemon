import axios from 'axios';

export const pokeInfo = async () =>{
        
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10") //pedido desde la api 
    .then((data) => {return data.data.results});   

    try {
        const catched = info.map(e => axios.get(e.url)); // hago un get a cada url de los pokemons
        let pokePromise = Promise.all(catched) //info de cada url esperando que se cumpla cada promesa y las retorna
            .then(e => {
                let pokemon = e.map(p => p.data); // info de cada pokemon desde su url 
                let array = []; // Almaceno en un array contenedor de cada pokemon 
                pokemon.map(p => {// mapeo la info y me traigo solo lo que me interesa de la api 
                    array.push({
                        id: p.id,
                        name: p.name,
                        height: p.height,
                        weight: p.weight,
                        image: p.sprites.versions["generation-v"]["black-white"].animated.front_default,
                        types: p.types.map((t) => t.type.name)
                    })
                });
                return array;
            })
            return pokePromise; 
    } catch (error) {
        console.log(error);
    }
};