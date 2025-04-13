import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './Telas/TelaInicial';
import TelaDescricao from './Telas/TelaDescricao';

//Os importes necessários para o app.js

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      {/* Esse Stack.Navigator vai definir as rotas */}

      <Stack.Navigator>

        {/* Essa é a tela principal */}

        <Stack.Screen 

          name="Pokemons"

          component={TelaInicial}

          options={{ title: 'Lista de pokémons' }} // corrigido acento em "pokémons"

        />

        {/* Essa é a tela de descricao/detalhes */}

        <Stack.Screen

          name="Detalhes"

          component={TelaDescricao}

          options={{ title: 'Detalhes do Pokémon' }}

        />

      </Stack.Navigator>

    </NavigationContainer>
    
  );
}