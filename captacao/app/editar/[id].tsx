import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import FormCliente from '../../components/FormCliente';
import { atualizar, buscarPorId } from '../../database/clientes';
import { Cliente } from '../../types/cliente';

export default function Editar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    buscarPorId(db, Number(id)).then((c) => setCliente(c ?? null));
  }, [db, id]);

  if (!cliente) return <Text style={{ padding: 16 }}>Carregando...</Text>;

  return (
    <FormCliente
      inicial={cliente}
      textoBotao="Salvar alterações"
      onSubmit={async (dados) => {
        await atualizar(db, Number(id), dados);
        router.back();
      }}
    />
  );
}