import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Cliente, ClienteForm, COR_STATUS, MODALIDADE, ORIGENS, STATUS_LIST } from '../types/cliente';
import { mostrarAviso } from '../utils/dialogo';
import Dropdown from './Dropdown';


type Props = {
  inicial?: Cliente;
  textoBotao: string;
  onSubmit: (dados: ClienteForm) => Promise<void>;
};

export default function FormCliente({ inicial, textoBotao, onSubmit }: Props) {
  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [telefone, setTelefone] = useState(inicial?.telefone ?? '');
  const [email, setEmail] = useState(inicial?.email ?? '');
  const [modalidade, setModalidade] = useState(inicial?.modalidade ?? '');
  const [origem, setOrigem] = useState(inicial?.origem ?? '');
  const [status, setStatus] = useState(inicial?.status ?? 'Novo');
  const [observacoes, setObservacoes] = useState(inicial?.observacoes ?? '');

  async function salvar() {
    if (!nome.trim() || !telefone.trim()) {
      mostrarAviso('Atenção', 'Nome e telefone são obrigatórios.');
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      mostrarAviso('Atenção', 'E-mail inválido.');
      return;
    }
    await onSubmit({
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      modalidade: modalidade.trim() || null,
      origem: origem || null,
      status,
      observacoes: observacoes.trim() || null,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <TextInput style={styles.input} placeholder="Nome *" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Telefone *" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Dropdown
        rotulo=""
        opcoes={MODALIDADE}
        valor={modalidade}
        onChange={setModalidade}
        placeholder="Modalidade"
      />

      <Text style={styles.rotulo}>Origem do contato</Text>
      <View style={styles.chips}>
        {ORIGENS.map((o) => (
          <TouchableOpacity key={o} style={[styles.chip, origem === o && styles.chipAtivo]} onPress={() => setOrigem(o)}>
            <Text style={origem === o ? styles.chipTextoAtivo : styles.chipTexto}>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.rotulo}>Status</Text>
      <View style={styles.chips}>
        {STATUS_LIST.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, status === s && { backgroundColor: COR_STATUS[s], borderColor: COR_STATUS[s] }]}
            onPress={() => setStatus(s)}
          >
            <Text style={status === s ? styles.chipTextoAtivo : styles.chipTexto}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
        placeholder="Observações"
        multiline
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>{textoBotao}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16, gap: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  rotulo: { fontWeight: 'bold', marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#bbb', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#fff' },
  chipAtivo: { backgroundColor: '#2196f3', borderColor: '#2196f3' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  botao: { backgroundColor: '#2196f3', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});