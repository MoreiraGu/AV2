import { useNavigate } from "react-router-dom";
import "../../styles/Teste.css";

export default function TesteMenu() {
  const navigate = useNavigate();

  return (
    <div className="teste-container">
      <h1>Menu de Testes</h1>
      <div className="botoes">
        <button onClick={() => navigate("/teste/listar")}>Listar Testes</button>
        <button onClick={() => navigate("/teste/registrar")}>Cadastrar Teste</button>
      </div>
    </div>
  );
}
