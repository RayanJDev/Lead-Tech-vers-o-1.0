import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props<T extends string> = {
  rotulo: string;
  opcoes: readonly T[];
  valor: T | '';
  onChange: (valor: T) => void;
  placeholder?: string;
};

export default function Dropdown<T extends string>({
  rotulo,
  opcoes,
  valor,
  onChange,
  placeholder = 'Selecione',
}: Props<T>) {
  const [aberto, setAberto] = useState(false);

  return (
    <View>
      <Text style={styles.rotulo}>{rotulo}</Text>

      <TouchableOpacity style={styles.campo} onPress={() => setAberto(!aberto)}>
        <Text style={valor ? styles.valor : styles.placeholder}>{valor || placeholder}</Text>
        <Text style={styles.seta}>{aberto ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {aberto && (
        <View style={styles.lista}>
          {opcoes.map((o) => (
            <TouchableOpacity
              key={o}
              style={[styles.opcao, o === valor && styles.opcaoAtiva]}
              onPress={() => {
                onChange(o);
                setAberto(false);
              }}
            >
              <Text style={o === valor ? styles.opcaoTextoAtivo : undefined}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: { fontWeight: 'bold', marginBottom: 6 },
  campo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  valor: { color: '#000' },
  placeholder: { color: '#999' },
  seta: { color: '#666', fontSize: 12 },
  lista: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 4,
    overflow: 'hidden',
  },
  opcao: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  opcaoAtiva: { backgroundColor: '#2196f3' },
  opcaoTextoAtivo: { color: '#fff', fontWeight: 'bold' },
});