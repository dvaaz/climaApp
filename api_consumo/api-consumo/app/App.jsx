import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from "react-native";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Alterar o IP para o da sua máquina local
//   const ipLocal = "http://192.168.0.1:8080/usuarios";
  const ipLocal = 'http://192.168.144.1:8080/usuarios';  //Endereço IPv4: 192.168.0.132

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const resposta = await fetch(ipLocal);
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarUsuarios();
  }, []);

  if (carregando) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#2196f3" />
            <Text>Carregando usuários...</Text>
        </View>
    );
  }
    return (
    <View style={styles.container}>
      <Text style={styles.titulo}> 👥 Lista de Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,    
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#666",
  },
});
