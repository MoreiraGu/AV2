import { useNavigate } from "react-router-dom";
import "../../styles/Etapa.css";

export default function EtapaMenu() {
  const navigate = useNavigate();

  return (
    <div className="etapa-container">
      <h1>Menu Etapas</h1>
      <div className="etapa-buttons">
        <button onClick={() => navigate("/etapa/cadastrar")}>Cadastrar Etapa</button>
        <button onClick={() => navigate("/etapa/listar")}>Listar Etapas</button>
      </div>
    </div>
  );
}
