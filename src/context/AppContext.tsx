import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
  usuarioLogado?: Usuario;
  setUsuarioLogado: (u: Usuario) => void;
  addTeste?: (teste: Teste) => void;

  funcionarios: Funcionario[];
  addFuncionario: (f: Funcionario) => void;

  aeronaves: Aeronave[];
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const addFuncionario = (f: Funcionario) => setFuncionarios(prev => [...prev, f]);
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | undefined>(undefined);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [testes, setTestes] = useState<Teste[]>([]);

  const addTeste = (teste: Teste) => setTestes(prev => [...prev, teste]);

  return (
    <AppContext.Provider value={{
      usuarioLogado,
      setUsuarioLogado,
      funcionarios,
      addFuncionario,
      addTeste,
      aeronaves,
      pecas,
      etapas,
      testes
    }}>
      {children}
    </AppContext.Provider>
  );
};


// -------------------- TIPOS --------------------

// Tipo do usuário
export interface Usuario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: string;
}

// Tipo do cliente
export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
}

// Tipo da aeronave
export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
  dataEntrega: string;
  cliente: Cliente;
}

// Tipo do funcionário
export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: "ADMINISTRADOR" | "OPERADOR" | "ENGENHEIRO";
}

// Tipo de teste
export interface Teste {
  id: string;
  aeronaveCodigo: string; // ← agora corresponde ao backend
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"; // ← agora corresponde ao backend
  resultado: "APROVADO" | "REPROVADO";
}

// Status possíveis da etapa
export type StatusEtapa = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";

// Tipo da etapa
export interface Etapa {
  nome: string;
  prazo: string;
  aeronaveCodigo: string;
  funcionarios: string[];
  status: StatusEtapa;
}

// Tipo da peça
export type TipoPeca = "NACIONAL" | "IMPORTADA";
export type StatusPeca = "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";

export interface Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  aeronaveCodigo: string;
  status: StatusPeca;
}
