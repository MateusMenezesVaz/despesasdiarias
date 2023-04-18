import React, { useState } from 'react';
import {StyleSheet,Text,View,Image,TextInput,Button,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [despesas, setDespesas] = useState([]);
  const [texto, setTexto] = useState('');
  const [valor, setValor] = useState('');
  const [textoLista, setTextoLista] = useState('');

  const handleAdicionarDespesa = () => {
    if (texto !== '' && valor !== '') {
      const novaDespesa = {
        id: Math.random().toString(),
        texto,
        valor: parseFloat(valor),
      };
      setDespesas([...despesas, novaDespesa]);
      setTexto('');
      setValor('');
    }
  };

  const handleExcluirDespesa = (id) => {
    setDespesas(despesas.filter((despesa) => despesa.id !== id));
  };

  const handleSalvarLista = () => {
    const textoDespesas = despesas
      .map((despesa) => `${despesa.texto}: R$ ${despesa.valor.toFixed(2)}`)
      .join('\n');
    setTextoLista(textoDespesas);
    setDespesas([]);
  };

  const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Gestão de Despesas Diárias</Text>
      </View>
      <Image source={require('./assets/despesas.png')} style={styles.imagem} />
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Despesa"
          value={texto}
          onChangeText={setTexto}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor (R$)"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
        <Button title="Adicionar" onPress={handleAdicionarDespesa} />
      </View>
      <ScrollView style={styles.lista}>
        <FlatList
          data={despesas}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleExcluirDespesa(item.id)}>
              <View style={styles.itemIcone}>
                <Ionicons name="md-remove-circle" size={24} color="red" />
              </View>
              <View style={styles.itemConteudo}>
                <Text style={styles.itemText}>{item.texto}</Text>
                <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <Button title="Salvar Lista" onPress={handleSalvarLista} />
        <TextInput
          style={styles.inputLista}
          placeholder="Lista de Despesas"
          value={textoLista}
          onChangeText={setTextoLista}
          multiline={true}
          editable={false}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imagem: {
    height: 100,
    aspectRatio: 1,
  },
  formulario: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
  },
  lista: {
    width: '80%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemIcone: {
    marginRight: 10,
  },
  itemConteudo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValor: {
    fontSize: 16,
  },
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputLista: {
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 150,
  },
})
