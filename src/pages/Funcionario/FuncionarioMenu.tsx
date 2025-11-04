import { useNavigate } from "react-router-dom";
import "../../styles/funcionario.css";

export default function FuncionarioMenu() {
  const navigate = useNavigate();

  return (
        <div className="funcionario-container">
        <h1>Menu Funcionário</h1>
        <div className="botoes">
            <button onClick={() => navigate("/funcionario/cadastrar")}>Cadastrar Funcionário</button>
            <button onClick={() => navigate("/funcionario/listar")}>Listar Funcionários</button>
        </div>
        </div>
  );
}