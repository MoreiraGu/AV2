import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Aeronave.css";

export default function ListarAeronave() {
  const { aeronaves } = useContext(AppContext)!;
  const navigate = useNavigate();

  return (
    <div className="aero-container">
      <h1>Lista de Aeronaves</h1>
      {aeronaves.length === 0 ? (
        <p>Nenhuma aeronave cadastrada.</p>
      ) : (
        <ul>
          {aeronaves.map((aero, index) => (
            <li key={index}>
              <strong>Código:</strong> {aero.codigo} | <strong>Modelo:</strong> {aero.modelo} | <strong>Tipo:</strong> {aero.tipo} <br />
              <strong>Cliente:</strong> {aero.cliente.nome} | <strong>Email:</strong> {aero.cliente.email} | <strong>Telefone:</strong> {aero.cliente.telefone} <br />
              <strong>Data de Entrega:</strong> {aero.dataEntrega}
            </li>
          ))}
        </ul>
      )}
      <div className="aero-buttons">
        <button className="secondary" onClick={() => navigate("/aeronave")}>Voltar</button>
    </div>
    </div>
  );
}
