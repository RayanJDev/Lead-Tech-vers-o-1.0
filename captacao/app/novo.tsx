import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import FormCliente from '../components/FormCliente';
import { inserir } from '../database/clientes';

export default function Novo() {
  const db = useSQLiteContext();
  const router = useRouter();

  return (
    <FormCliente
      textoBotao="Salvar cliente"
      onSubmit={async (dados) => {
        await inserir(db, dados);
        router.back();
      }}
    />
  );
}