import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { listar } from '../database/clientes';
import { Cliente, COR_STATUS, Status, STATUS_LIST } from '../types/cliente';

export default function Lista() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Status | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      listar(db, busca, filtro).then(setClientes);
    }, [db, busca, filtro])
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.busca} placeholder="Buscar por nome ou empresa" value={busca} onChangeText={setBusca} />

      <View style={styles.chips}>
        <TouchableOpacity style={[styles.chip, !filtro && styles.chipAtivo]} onPress={() => setFiltro(undefined)}>
          <Text style={!filtro ? styles.chipTextoAtivo : undefined}>Todos</Text>
        </TouchableOpacity>
        {STATUS_LIST.map((s) => (
          <TouchableOpacity key={s} style={[styles.chip, filtro === s && styles.chipAtivo]} onPress={() => setFiltro(s)}>
            <Text style={filtro === s ? styles.chipTextoAtivo : undefined}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={clientes}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum cliente encontrado.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/${item.id}` as never)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.sub}>{item.modalidade ?? 'Sem modalidade'} • {item.telefone}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: COR_STATUS[item.status] }]}>
              <Text style={styles.badgeTexto}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/novo' as never)}>
        <Text style={styles.botaoTexto}>+ Novo cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  busca: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: '#fff', marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  chip: { borderWidth: 1, borderColor: '#bbb', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#fff' },
  chipAtivo: { backgroundColor: '#2196f3', borderColor: '#2196f3' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10, elevation: 2 },
  nome: { fontSize: 17, fontWeight: 'bold' },
  sub: { color: '#666', marginTop: 2 },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 40, color: '#999' },
  botao: { backgroundColor: '#2196f3', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});