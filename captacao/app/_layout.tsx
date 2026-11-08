import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { migrate } from '../database/migrate';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="captacao.db" onInit={migrate}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Clientes' }} />
        <Stack.Screen name="novo" options={{ title: 'Novo Cliente' }} />
        <Stack.Screen name="[id]" options={{ title: 'Detalhes' }} />
        <Stack.Screen name="editar/[id]" options={{ title: 'Editar Cliente' }} />
      </Stack>
    </SQLiteProvider>
  );
}