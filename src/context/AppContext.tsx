import React, { createContext, useState, ReactNode } from "react";

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
  aeronave: string;
  tipoTeste: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
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

// -------------------- CONTEXTO --------------------
interface AppContextType {
  usuarioLogado: Usuario | null;
  setUsuarioLogado: (usuario: Usuario) => void;

  aeronaves: Aeronave[];
  addAeronave: (aeronave: Aeronave) => void;

  funcionarios: Funcionario[];
  addFuncionario: (funcionario: Funcionario) => void;
  getFuncionarioById: (id: string) => Funcionario | undefined;

  etapas: Etapa[];
  addEtapa: (etapa: Etapa) => void;
  atualizarStatusEtapa: (index: number, status: StatusEtapa) => void;

  pecas: Peca[];
  addPeca: (peca: Peca) => void;
  atualizarStatusPeca: (index: number, status: StatusPeca) => void;

  testes: Teste[];
  addTeste: (teste: Teste) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// -------------------- PROVIDER COM MOCKS --------------------
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);

  // ---- MOCKS ----
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: "MOCK-01",
      modelo: "F-22 Raptor",
      tipo: "MILITAR",
      capacidade: 1,
      alcance: 2000,
      dataEntrega: "01/01/2025",
      cliente: { nome: "Cliente Teste", email: "teste@email.com", telefone: "123456789" },
    },
    {
      codigo: "MOCK-02",
      modelo: "Cessna 172",
      tipo: "CIVIL",
      capacidade: 4,
      alcance: 1000,
      dataEntrega: "15/02/2025",
      cliente: { nome: "Cliente X", email: "x@email.com", telefone: "987654321" },
    },
  ]);
  const addAeronave = (aeronave: Aeronave) => setAeronaves([...aeronaves, aeronave]);

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: "F1", nome: "Engenheiro 1", telefone: "111111", endereco: "Rua A", usuario: "eng1", senha: "123", nivelPermissao: "ENGENHEIRO" },
    { id: "F2", nome: "Operador 2", telefone: "222222", endereco: "Rua B", usuario: "op2", senha: "123", nivelPermissao: "OPERADOR" },
  ]);
  const addFuncionario = (funcionario: Funcionario) => setFuncionarios([...funcionarios, funcionario]);
  const getFuncionarioById = (id: string) => funcionarios.find(f => f.id === id);

  const [etapas, setEtapas] = useState<Etapa[]>([
    { nome: "Montagem Inicial", prazo: "10/03/2025", aeronaveCodigo: "MOCK-01", funcionarios: ["Engenheiro 1", "Operador 2"], status: "CONCLUIDA" },
    { nome: "Testes de Voo", prazo: "20/03/2025", aeronaveCodigo: "MOCK-01", funcionarios: [], status: "PENDENTE" },
    { nome: "Inspeção Final", prazo: "01/04/2025", aeronaveCodigo: "MOCK-02", funcionarios: ["Engenheiro 1"], status: "EM_ANDAMENTO" },
  ]);
  const addEtapa = (etapa: Etapa) => setEtapas([...etapas, etapa]);
  const atualizarStatusEtapa = (index: number, status: StatusEtapa) => {
    const novasEtapas = [...etapas];
    novasEtapas[index] = { ...novasEtapas[index], status };
    setEtapas(novasEtapas);
  };

  const [pecas, setPecas] = useState<Peca[]>([
    { nome: "Motor X1", tipo: "IMPORTADA", fornecedor: "Fornecedor A", aeronaveCodigo: "MOCK-01", status: "EM_PRODUCAO" },
    { nome: "Asa Y2", tipo: "NACIONAL", fornecedor: "Fornecedor B", aeronaveCodigo: "MOCK-01", status: "EM_TRANSPORTE" },
    { nome: "Roda Z3", tipo: "NACIONAL", fornecedor: "Fornecedor C", aeronaveCodigo: "MOCK-02", status: "PRONTA" },
  ]);
  const addPeca = (peca: Peca) => setPecas([...pecas, peca]);
  const atualizarStatusPeca = (index: number, status: StatusPeca) => {
    const novasPecas = [...pecas];
    novasPecas[index] = { ...novasPecas[index], status };
    setPecas(novasPecas);
  };

  const [testes, setTestes] = useState<Teste[]>([
    { id: "T1", aeronave: "MOCK-01", tipoTeste: "ELETRICO", resultado: "APROVADO" },
    { id: "T2", aeronave: "MOCK-01", tipoTeste: "HIDRAULICO", resultado: "REPROVADO" },
    { id: "T3", aeronave: "MOCK-02", tipoTeste: "AERODINAMICO", resultado: "APROVADO" },
  ]);
  const addTeste = (teste: Teste) => setTestes([...testes, teste]);

  return (
    <AppContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        aeronaves,
        addAeronave,
        funcionarios,
        addFuncionario,
        getFuncionarioById,
        etapas,
        addEtapa,
        atualizarStatusEtapa,
        pecas,
        addPeca,
        atualizarStatusPeca,
        testes,
        addTeste,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
