import React, { useEffect, useState} from 'react';
import {
    View, Text, FlatList,  ActivityIndicator,  TextInput,  StyleSheet,   Image, TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';

  //Imports necessários para a página inicial

  export default function TelaInicial({ navigation }) {

    const [pokemons, setPokemons] = useState([])

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    //Aqui estao os estados para os pokemons, pro carregamento e pro filtro de busca
  

  useEffect(() => {

    buscarPokemons();

  }, []);

  // Aqui carrega os dados quando tudo é montado

  const buscarPokemons = async() => {

    //Essa é uma funcao para buscar os pokemons direto da API
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
         setPokemons(response.data.results);
    } catch (error) {

        //Código para caso de erro ao buscar os pokemons

        console.error('Erro ao buscar pokemons:', error);

    } finally{

        setLoading(false)

    }

  };

  //Codigo para renderizar os items

  const renderItem = ({item}) => {

    //Codigo para extrair o id da url do pokemon

    const id = item.url.split('/')[item.url.split('/').length - 2];

    const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  ;

    //Codigo para aplicar um filtro de busca

    if (!item.name.toLowerCase().includes(search.toLowerCase())) return null;

    return (

    //Quando o usuario clicar, ele redireciona para a página de detalhes

    <TouchableOpacity style={styles.itemContainer}

    onPress={() => navigation.navigate('Detalhes', {url: item.url})} >

        <Image source={{ uri: imagem}} style={styles.image}/>

        <Text style={styles.itemText}>{item.name}</Text>

        </TouchableOpacity>

        );
         };

  return (

    <View style={styles.container}>

        
        {/* Aqui é onde fica o campo de busca*/}

        <TextInput 

        style={styles.input}

        placeholder='Buscar Pokemon...'

        value={search}

        onChangeText={setSearch} />

        {/* Aqui é o indicador de carregamento ou da lista de pokemon*/}

        {loading ? (

    <ActivityIndicator size="large" color ="#E3350D" />

        ) : ( <FlatList

            data={pokemons}

            keyExtractor={(item) => item.name}

            renderItem={renderItem} />
            
        )}
            </View>
        );
        }

// Estilizacao da tela
const styles = StyleSheet.create({

    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
    },

    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },

    image: {
      width: 50,
      height: 50,
      marginRight: 16,
    },

    itemText: {
      fontSize: 18,
      textTransform: 'capitalize',
    },

  }
);