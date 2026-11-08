import { SQLiteDatabase } from 'expo-sqlite';
import { Cliente, ClienteForm, Status } from '../types/cliente';

export function listar(db: SQLiteDatabase, busca = '', status?: Status) {
  const params: string[] = [`%${busca}%`, `%${busca}%`];
  let sql = 'SELECT * FROM clientes WHERE (nome LIKE ? OR modalidade LIKE ?)';
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  sql += ' ORDER BY id DESC';
  return db.getAllAsync<Cliente>(sql, params);
}

export const buscarPorId = (db: SQLiteDatabase, id: number) =>
  db.getFirstAsync<Cliente>('SELECT * FROM clientes WHERE id = ?', [id]);

export const inserir = (db: SQLiteDatabase, c: ClienteForm) =>
  db.runAsync(
    `INSERT INTO clientes (nome, telefone, email, modalidade, origem, status, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [c.nome, c.telefone, c.email, c.modalidade, c.origem, c.status, c.observacoes]
  );

export const atualizar = (db: SQLiteDatabase, id: number, c: ClienteForm) =>
  db.runAsync(
    `UPDATE clientes SET nome=?, telefone=?, email=?, modalidade=?, origem=?, status=?, observacoes=?
     WHERE id=?`,
    [c.nome, c.telefone, c.email, c.modalidade, c.origem, c.status, c.observacoes, id]
  );

export const atualizarStatus = (db: SQLiteDatabase, id: number, status: Status) =>
  db.runAsync('UPDATE clientes SET status = ? WHERE id = ?', [status, id]);

export const excluir = (db: SQLiteDatabase, id: number) =>
  db.runAsync('DELETE FROM clientes WHERE id = ?', [id]);