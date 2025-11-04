import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../styles/Etapa.css";

export default function ListarEtapas() {
  const { etapas, aeronaves, funcionarios } = useContext(AppContext)!;
  const navigate = useNavigate();

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  const getFuncionarioNome = (id: string) => {
    const f = funcionarios.find(f => f.id === id);
    return f ? f.nome : "Desconhecido";
  };

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
                onDoubleClick={() => navigate(`/etapa/detalhes/${index}`)}
              >
                <td>{etapa.nome}</td>
                <td>{etapa.prazo}</td>
                <td>{getAeronaveModelo(etapa.aeronaveCodigo)}</td>
                <td>{etapa.funcionarios.map(getFuncionarioNome).join(", ")}</td>
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
