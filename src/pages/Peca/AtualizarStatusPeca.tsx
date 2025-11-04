// src/pages/Peca/AtualizarStatusPeca.tsx
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext, StatusPeca } from "../../context/AppContext";
import "../../styles/peca.css";


export default function AtualizarStatusPeca() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { pecas, atualizarStatusPeca, aeronaves } = useContext(AppContext)!;

  if (!index) return <div>Peça não encontrada</div>;

  const pecaIndex = parseInt(index);
  const peca = pecas[pecaIndex];
  if (!peca) return <div>Peça não encontrada</div>;

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  const handleStatusChange = (status: StatusPeca) => {
    atualizarStatusPeca(pecaIndex, status);
  };

  return (
    <div className="peca-container">
      <h1>Detalhes da Peça</h1>
      <p><strong>Nome:</strong> {peca.nome}</p>
      <p><strong>Tipo:</strong> {peca.tipo}</p>
      <p><strong>Fornecedor:</strong> {peca.fornecedor}</p>
      <p><strong>Aeronave:</strong> {getAeronaveModelo(peca.aeronaveCodigo)}</p>
      <p><strong>Status:</strong> {peca.status}</p>

      {peca.status === "EM_PRODUCAO" && (
        <button onClick={() => handleStatusChange("EM_TRANSPORTE")}>Enviar para Transporte</button>
      )}
      {peca.status === "EM_TRANSPORTE" && (
        <button onClick={() => handleStatusChange("PRONTA")}>Marcar como Pronta</button>
      )}

      <button onClick={() => navigate("/peca")}>Voltar</button>
    </div>
  );
}
