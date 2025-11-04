import { useNavigate } from "react-router-dom";
import "../../styles/Aeronave.css";

export default function AeronaveMenu() {
  const navigate = useNavigate();

  return (
    <div className="aero-container">
      <h1>Menu Aeronave</h1>
      <div className="aero-buttons">
      <button className="primary" onClick={() => navigate("/aeronave/cadastrar")}>Cadastrar Aeronave</button>
      <button className="secondary" onClick={() => navigate("/aeronave/listar")}>Listar Aeronaves</button>
      </div>
    </div>
  );
}