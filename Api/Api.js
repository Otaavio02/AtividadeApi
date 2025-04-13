import axios from "axios";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})

export default api

//Código para a implementacao da API de pokemon