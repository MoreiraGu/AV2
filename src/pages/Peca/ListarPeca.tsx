// src/pages/Peca/ListarPeca.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/peca.css";

const API_PECAS = "http://localhost:3000/pecas";
const API_AERONAVES = "http://localhost:3000/aeronaves";

export default function ListarPeca() {
  const navigate = useNavigate();
  const [pecas, setPecas] = useState<any[]>([]);
  const [aeronaves, setAeronaves] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pecasRes, aeronavesRes] = await Promise.all([
          axios.get(API_PECAS),
          axios.get(API_AERONAVES),
        ]);
        setPecas(pecasRes.data);
        setAeronaves(aeronavesRes.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao buscar dados.");
      }
    }
    fetchData();
  }, []);

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  return (
    <div className="peca-container">
      <h1>Listagem de Peças</h1>

      {pecas.length === 0 ? (
        <p>Nenhuma peça cadastrada.</p>
      ) : (
        <table border={1} cellPadding={5}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Fornecedor</th>
              <th>Aeronave</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((peca, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onDoubleClick={() => navigate(`/peca/detalhes/${peca.id}`)}
              >
                <td>{peca.nome}</td>
                <td>{peca.tipo}</td>
                <td>{peca.fornecedor}</td>
                <td>{getAeronaveModelo(peca.aeronaveCodigo)}</td>
                <td>{peca.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="botoes">
        <button onClick={() => navigate("/peca")}>Voltar</button>
      </div>
    </div>
  );
}
