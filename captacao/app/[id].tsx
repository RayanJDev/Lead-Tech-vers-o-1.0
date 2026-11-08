import { useCallback, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { atualizarStatus, buscarPorId, excluir } from '../database/clientes';
import { Cliente, COR_STATUS, Status, STATUS_LIST } from '../types/cliente';
import { confirmar } from '../utils/dialogo';

export default function Detalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useFocusEffect(
    useCallback(() => {
      buscarPorId(db, Number(id)).then((c) => setCliente(c ?? null));
    }, [db, id])
  );

  async function mudarStatus(s: Status) {
    await atualizarStatus(db, Number(id), s);
    setCliente((c) => (c ? { ...c, status: s } : c));
  }
  function formatarData(valor: string) {
  // SQLite grava "YYYY-MM-DD HH:MM:SS" em UTC; o "Z" avisa isso ao JavaScript
  const data = new Date(valor.replace(' ', 'T') + 'Z');
  if (isNaN(data.getTime())) return valor;
  return data.toLocaleString('pt-BR');
}

  function confirmarExclusao() {
    confirmar('Excluir', 'Deseja realmente excluir este cliente?', async () => {
      await excluir(db, Number(id));
      router.back();
  });
}

  if (!cliente) return <Text style={{ padding: 16 }}>Carregando...</Text>;

  const numero = cliente.telefone.replace(/\D/g, '');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nome}>{cliente.nome}</Text>
      <Text>Telefone: {cliente.telefone}</Text>
      <Text>E-mail: {cliente.email ?? '-'}</Text>
      <Text>Modalidade: {cliente.modalidade ?? '-'}</Text>
      <Text>Origem: {cliente.origem ?? '-'}</Text>
      <Text>Cadastrado em: {formatarData(cliente.criado_em)}</Text>
      <Text>Observações: {cliente.observacoes ?? '-'}</Text>

      <Text style={styles.rotulo}>Status do funil</Text>
      <View style={styles.chips}>
        {STATUS_LIST.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, cliente.status === s && { backgroundColor: COR_STATUS[s], borderColor: COR_STATUS[s] }]}
            onPress={() => mudarStatus(s)}
          >
            <Text style={cliente.status === s ? styles.chipTextoAtivo : undefined}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#2196f3' }]} onPress={() => Linking.openURL(`tel:${numero}`)}>
          <Text style={styles.botaoTexto}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#25d366' }]} onPress={() => Linking.openURL(`https://wa.me/55${numero}`)}>
          <Text style={styles.botaoTexto}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#ff9800' }]} onPress={() => router.push(`/editar/${id}`)}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#e53935' }]} onPress={confirmarExclusao}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  nome: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  rotulo: { fontWeight: 'bold', marginTop: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#bbb', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#fff' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  linha: { flexDirection: 'row', gap: 10, marginTop: 12 },
  botao: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});