import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarEtapas } from "../../services/etapaService";
import "../../styles/Etapa.css";

type Funcionario = { id: string; nome: string };
type Etapa = {
  nome: string;
  prazo: string;
  aeronaveCodigo: string;
  funcionarios: Funcionario[];
  status: string;
};

export default function ListarEtapas() {
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEtapas() {
      const data: Etapa[] = await listarEtapas();
      setEtapas(data);
    }
    fetchEtapas();
  }, []);

  return (
    <div className="etapa-container">
      <h1>Listagem de Etapas</h1>
      <div className="etapa-tabela-container">
        <table className="etapa-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Prazo</th>
              <th>Aeronave</th>
              <th>Funcionários</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {etapas.map((etapa, index) => (
              <tr
                key={index}
                onDoubleClick={() =>
                  navigate(
                    `/etapa/detalhes/${encodeURIComponent(etapa.nome)}/${encodeURIComponent(etapa.aeronaveCodigo)}`
                  )
                }
              >
                <td>{etapa.nome}</td>
                <td>{etapa.prazo}</td>
                <td>{etapa.aeronaveCodigo}</td>
                <td>
                  {etapa.funcionarios
                    .map((f: Funcionario) => f.nome)
                    .join(", ")}
                </td>
                <td>{etapa.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="etapa-buttons">
        <button onClick={() => navigate("/etapa")}>Voltar</button>
      </div>
    </div>
  );
}
