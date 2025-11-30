import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StatusEtapa } from "../../types/enums";
import {
  listarEtapas,
  iniciarEtapa,
  finalizarEtapa,
} from "../../services/etapaService";
import { listarAeronaves } from "../../services/aeronaveService";
import { listarFuncionarios } from "../../services/funcionarioService";
import "../../styles/Etapa.css";

type Funcionario = { id: string; nome: string };
type Etapa = {
  nome: string;
  prazo: string;
  aeronaveCodigo: string;
  funcionarios: Funcionario[];
  status: string;
};
type Aeronave = { codigo: string; modelo: string };

export default function DetalhesEtapa() {
  const { nome, aeronaveCodigo } = useParams<{ nome: string; aeronaveCodigo: string }>();
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    async function fetchData() {
      const todasEtapas: Etapa[] = await listarEtapas();
      // Tipagem do parâmetro
      const e = todasEtapas.find((et: Etapa) => et.nome === nome && et.aeronaveCodigo === aeronaveCodigo);
      setEtapa(e || null);

      const a = await listarAeronaves();
      setAeronaves(a);

      const f = await listarFuncionarios();
      setFuncionarios(f);
    }
    fetchData();
  }, [nome, aeronaveCodigo]);

  if (!etapa)
    return (
      <div className="etapa-container">
        <p>Etapa não encontrada</p>
      </div>
    );

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  const getFuncionarioNome = (id: string) => {
    const f = funcionarios.find(f => f.id === id);
    return f ? f.nome : "Desconhecido";
  };

  const handleStatusChange = async (status: StatusEtapa) => {
    try {
      let updated: Etapa | null = null;
        if (status === StatusEtapa.EM_ANDAMENTO)
          updated = await iniciarEtapa(etapa.nome, etapa.aeronaveCodigo);

        if (status === StatusEtapa.CONCLUIDA)
          updated = await finalizarEtapa(etapa.nome, etapa.aeronaveCodigo);

      setEtapa(updated);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status da etapa");
    }
  };

  return (
    <div className="etapa-container etapa-detalhes">
      <h1>Detalhes da Etapa</h1>
      <p><strong>Nome:</strong> {etapa.nome}</p>
      <p><strong>Prazo:</strong> {etapa.prazo}</p>
      <p><strong>Aeronave:</strong> {getAeronaveModelo(etapa.aeronaveCodigo)}</p>
      <p>
        <strong>Funcionários:</strong>{" "}
        {etapa.funcionarios.map(f => getFuncionarioNome(f.id)).join(", ")}
      </p>
      <p><strong>Status:</strong> {etapa.status}</p>

      <div className="botoes">
        {etapa.status === StatusEtapa.PENDENTE && (
          <button onClick={() => handleStatusChange(StatusEtapa.EM_ANDAMENTO)}>
            Iniciar
          </button>
        )}
        {etapa.status === StatusEtapa.EM_ANDAMENTO && (
          <button onClick={() => handleStatusChange(StatusEtapa.CONCLUIDA)}>
            Finalizar
          </button>
        )}
        <button onClick={() => navigate("/etapa/listar")}>Voltar</button>
      </div>
    </div>
  );
}
