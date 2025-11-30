// src/pages/Peca/CadastroPeca.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/peca.css";

const API_URL = "http://localhost:3000/pecas"; // endpoint da API
const API_AERONAVES = "http://localhost:3000/aeronaves";

export default function CadastroPeca() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"NACIONAL" | "IMPORTADA">("NACIONAL");
  const [fornecedor, setFornecedor] = useState("");
  const [aeronaveCodigo, setAeronaveCodigo] = useState("");
  const [aeronaves, setAeronaves] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAeronaves() {
      try {
        const res = await axios.get(API_AERONAVES);
        setAeronaves(res.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao buscar aeronaves.");
      }
    }
    fetchAeronaves();
  }, []);

  const handleSubmit = async () => {
    try {
      const novaPeca = {
        nome,
        tipo,
        fornecedor,
        aeronaveCodigo,
        status: "EM_PRODUCAO",
      };

      await axios.post(API_URL, novaPeca);
      alert("Peça cadastrada com sucesso!");
      navigate("/peca");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar peça.");
    }
  };

  return (
    <div className="peca-container">
      <h1>Cadastro de Peça</h1>

      <div className="peca-form">
        <input
          type="text"
          placeholder="Nome da peça"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <h3>Tipo da peça</h3>
        <select value={tipo} onChange={e => setTipo(e.target.value as "NACIONAL" | "IMPORTADA")}>
          <option value="NACIONAL">Nacional</option>
          <option value="IMPORTADA">Importada</option>
        </select>

        <input
          type="text"
          placeholder="Fornecedor"
          value={fornecedor}
          onChange={e => setFornecedor(e.target.value)}
        />

        <h3>Aeronave</h3>
        <select value={aeronaveCodigo} onChange={e => setAeronaveCodigo(e.target.value)}>
          <option value="">Selecione uma aeronave</option>
          {aeronaves.map(a => (
            <option key={a.codigo} value={a.codigo}>
              {a.codigo} - {a.modelo}
            </option>
          ))}
        </select>

        <div className="peca-buttons">
          <button onClick={handleSubmit}>Cadastrar</button>
          <button onClick={() => navigate("/peca")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
