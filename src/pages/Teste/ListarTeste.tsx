import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../styles/Teste.css";

export default function ListarTeste() {
  const { testes } = useContext(AppContext)!;
  const navigate = useNavigate();

  return (
    <div className="teste-container">
      <h1>Lista de Testes</h1>

      {testes && testes.length > 0 ? (
        <ul>
          {testes.map((teste: any) => (
            <li key={teste.id}>
              <strong>Aeronave:</strong> {teste.aeronave} |{" "}
              <strong>Tipo:</strong> {teste.tipoTeste} |{" "}
              <strong>Resultado:</strong> {teste.resultado}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum teste registrado ainda.</p>
      )}

      <button onClick={() => navigate("/teste")}>Voltar</button>
    </div>
  );
}
