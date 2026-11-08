import { SQLiteDatabase } from 'expo-sqlite';

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT,
      empresa TEXT,
      origem TEXT,
      status TEXT NOT NULL DEFAULT 'Novo',
      observacoes TEXT,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}