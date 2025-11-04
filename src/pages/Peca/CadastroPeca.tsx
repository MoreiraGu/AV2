import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Peca, TipoPeca } from "../../context/AppContext";
import "../../styles/peca.css";

export default function CadastroPeca() {
  const { addPeca, aeronaves } = useContext(AppContext)!;
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoPeca>("NACIONAL");
  const [fornecedor, setFornecedor] = useState("");
  const [aeronaveCodigo, setAeronaveCodigo] = useState("");

  const handleSubmit = () => {
    const novaPeca: Peca = {
      nome,
      tipo,
      fornecedor,
      aeronaveCodigo,
      status: "EM_PRODUCAO"
    };
    addPeca(novaPeca);
    alert("Peça cadastrada com sucesso!");
    navigate("/peca");
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
        <select value={tipo} onChange={e => setTipo(e.target.value as TipoPeca)}>
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
