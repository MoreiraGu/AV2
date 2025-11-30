import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Aeronave.css";

const API_URL = "http://localhost:3000/aeronaves"; // ajuste se necessário

export default function ListarAeronave() {
  const navigate = useNavigate();
  const [aeronaves, setAeronaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAeronaves() {
      try {
        const response = await axios.get(API_URL);
        setAeronaves(response.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar aeronaves do backend.");
      } finally {
        setLoading(false);
      }
    }
    fetchAeronaves();
  }, []);

  if (loading) return <p>Carregando aeronaves...</p>;

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
