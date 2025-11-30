import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Aeronave.css";

const API_URL = "http://localhost:3000/aeronaves"; // ajuste se necessário

export default function CadastroAeronave() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("COMERCIAL");
  const [capacidade, setCapacidade] = useState(0);
  const [alcance, setAlcance] = useState(0);
  const [dataEntrega, setDataEntrega] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");

  const handleSubmit = async () => {
    if (!codigo || !modelo || !tipo) {
      alert("Código, modelo e tipo são obrigatórios!");
      return;
    }

    const novaAeronave = {
      codigo,
      modelo,
      tipo,
      capacidade,
      alcance,
      dataEntrega,
      cliente: {
        nome: clienteNome,
        email: clienteEmail,
        telefone: clienteTelefone,
      },
    };

    try {
      await axios.post(API_URL, novaAeronave);
      alert("Aeronave cadastrada com sucesso!");
      navigate("/aeronave/listar");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar aeronave. Verifique o backend.");
    }
  };

  return (
    <div className="aero-container">
      <h1>Cadastro de Aeronave</h1>
      
      <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
      <input placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="COMERCIAL">Comercial</option>
        <option value="MILITAR">Militar</option>
      </select>
      <input type="number" placeholder="Capacidade" value={capacidade} onChange={e => setCapacidade(Number(e.target.value))} />
      <input type="number" placeholder="Alcance" value={alcance} onChange={e => setAlcance(Number(e.target.value))} />
      <input type="date" placeholder="Data de entrega" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} />

      <h3>Dados do Cliente</h3>
      <input placeholder="Nome" value={clienteNome} onChange={e => setClienteNome(e.target.value)} />
      <input placeholder="Email" value={clienteEmail} onChange={e => setClienteEmail(e.target.value)} />
      <input placeholder="Telefone" value={clienteTelefone} onChange={e => setClienteTelefone(e.target.value)} />

      <div className="aero-buttons">
        <button className="primary" onClick={handleSubmit}>Cadastrar</button>
        <button className="secondary" onClick={() => navigate("/aeronave")}>Voltar</button>
      </div>
    </div>
  );
}
