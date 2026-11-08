export type Status = 'Novo'| 'Em contato'| 'Convertido'| 'Perdido';

export type Cliente = {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    modalidade: string | null;
    origem: string| null;
    status: Status;
    observacoes: string | null;
    criado_em: string;
};

export type ClienteForm = Omit<Cliente, 'id'| 'criado_em'>;

export const MODALIDADE = ['Jiu-Jitsu','Boxe','Kids','Feminino','Funcional'];
export const STATUS_LIST: Status[] = ['Novo','Em contato','Convertido','Perdido'];
export const ORIGENS = ['Instagram','Indicação','Site','Whatsapp','Evento','Outro'];

export const COR_STATUS: Record<Status, string> = {
    Novo: '#2196f3',
    'Em contato': '#ff9800',
    Convertido: '#4caf50',
    Perdido: '#9e9e9e'
};