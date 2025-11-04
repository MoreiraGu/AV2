import { useNavigate } from "react-router-dom";
import "../../styles/relatorio.css";

export default function RelatorioMenu() {
  const navigate = useNavigate();

  return (
    <div className="relatorio-container">
     <h1>Menu de Relatórios</h1>

    <div className="relatorio-botoes">
        <button onClick={() => navigate("/relatorio/gerar")}>Gerar Relatório</button>
        <button onClick={() => navigate("/relatorio/listar")}>Listar Relatórios</button>
    </div>
</div>

  );
}
