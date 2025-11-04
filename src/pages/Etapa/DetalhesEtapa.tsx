import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext, StatusEtapa } from "../../context/AppContext";
import "../../styles/Etapa.css";

export default function DetalhesEtapa() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { etapas, atualizarStatusEtapa, aeronaves, funcionarios } = useContext(AppContext)!;

  if (!index) return <div className="etapa-container"><p>Etapa não encontrada</p></div>;

  const etapaIndex = parseInt(index);
  const etapa = etapas[etapaIndex];
  if (!etapa) return <div className="etapa-container"><p>Etapa não encontrada</p></div>;

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  const getFuncionarioNome = (id: string) => {
    const f = funcionarios.find(f => f.id === id);
    return f ? f.nome : "Desconhecido";
  };

  const handleStatusChange = (status: StatusEtapa) => {
    atualizarStatusEtapa(etapaIndex, status);
  };

  return (
    <div className="etapa-container etapa-detalhes">
      <h1>Detalhes da Etapa</h1>

      <p><strong>Nome:</strong> {etapa.nome}</p>
      <p><strong>Prazo:</strong> {etapa.prazo}</p>
      <p><strong>Aeronave:</strong> {getAeronaveModelo(etapa.aeronaveCodigo)}</p>
      <p><strong>Funcionários:</strong> {etapa.funcionarios.map(getFuncionarioNome).join(", ")}</p>
      <p><strong>Status:</strong> {etapa.status}</p>

      <div className="botoes">
        {etapa.status === "PENDENTE" && (
          <button onClick={() => handleStatusChange("EM_ANDAMENTO")}>Iniciar</button>
        )}
        {etapa.status === "EM_ANDAMENTO" && (
          <button onClick={() => handleStatusChange("CONCLUIDA")}>Finalizar</button>
        )}
        <button onClick={() => navigate("/etapa/listar")}>Voltar</button>
      </div>
    </div>
  );
}