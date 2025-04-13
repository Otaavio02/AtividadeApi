import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';

//Imports necessários para a página de detalhes

export default function TelaDescricao({ route }) {

//Código para receber a url da API

const { url } = route.params;

//Estados para os dados do pokemons especifico e para o loading

const [pokemon, setPokemon] = useState(null);

const [loading, setLoading] = useState(true);

//Codigo para buscar os dados do pokemon especifico ao abrir a tela

useEffect(() => {

    axios.get(url)

    .then((response) => setPokemon(response.data))

    .catch((error) => console.error(error))

    .finally(() => setLoading(false));

}, []);


//Para mostrar o loading enquanto carrega os dados

 if (loading) {

     return <ActivityIndicator size="large" style={{ flex: 1, justifyContent:'center'}} />;

        }

 return (
            <View style={styles.container}>

        {/* Codigo para mostrar a imagem e os dados do pokemon escolhido */}

        <Image source={{ uri: pokemon.sprites.front_default}}

        style={styles.image} />

        <Text style={styles.name}>{pokemon.name}</Text>

        <Text style={styles.info}>Altura: {pokemon.height}0 Cm</Text>

        <Text style={styles.info}>Peso: {pokemon.weight} Pounds</Text>
        
        <Text style={styles.info}>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</Text>

    </View>
);
}

//Estilizacao da tela

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
    image: { width: 150, height: 150, marginBottom: 20 },
    name: { fontSize: 26, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 10 },
    info: { fontSize: 18, marginVertical: 4 },
  });