import { useNavigate } from "react-router-dom";
import "../../styles/peca.css";

export default function PecaMenu() {
  const navigate = useNavigate();

  return (
    <div className="peca-container">
      <h1>Menu Peças</h1>
      <div className="botoes">
        <button onClick={() => navigate("/peca/cadastrar")}>Cadastrar Peça</button>
        <button onClick={() => navigate("/peca/listar")}>Listar Peças</button>
      </div>
    </div>
  );
}
