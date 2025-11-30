// src/pages/Peca/AtualizarStatusPeca.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/peca.css";

const API_URL = "http://localhost:3000/pecas"; // ajuste a URL do backend

export default function AtualizarStatusPeca() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [peca, setPeca] = useState<any>(null);
  const [aeronaves, setAeronaves] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar peças
        const pecasRes = await axios.get(API_URL);
        const p = pecasRes.data.find((p: any) => p.id === index); // use id se disponível
        setPeca(p || null);

        // Buscar aeronaves
        const aeroRes = await axios.get("http://localhost:3000/aeronaves");
        setAeronaves(aeroRes.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do backend.");
      }
    }
    fetchData();
  }, [index]);

  if (!peca) return <div>Peça não encontrada</div>;

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  const handleStatusChange = async (novoStatus: string) => {
    try {
      const res = await axios.patch(`${API_URL}/${peca.id}`, { status: novoStatus });
      setPeca(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status da peça.");
    }
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
