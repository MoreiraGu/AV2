import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Peca } from "../../context/AppContext";
import "../../styles/peca.css";

export default function ListarPeca() {
  const { pecas, aeronaves } = useContext(AppContext)!;
  const navigate = useNavigate();

  const getAeronaveModelo = (codigo: string) => {
    const a = aeronaves.find(a => a.codigo === codigo);
    return a ? a.modelo : "Desconhecida";
  };

  return (
    <div className="peca-container">
      <h1>Listagem de Peças</h1>

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
          {pecas.map((peca: Peca, index: number) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onDoubleClick={() => navigate(`/peca/detalhes/${index}`)}
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

      <div className="botoes">
        <button onClick={() => navigate("/peca")}>Voltar</button>
      </div>
    </div>
  );
}
