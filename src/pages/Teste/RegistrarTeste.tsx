import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../styles/Teste.css";

export default function RegistrarTeste() {
  const navigate = useNavigate();
  const { addTeste, aeronaves } = useContext(AppContext)!;

  const [aeronave, setAeronave] = useState("");
  const [tipoTeste, setTipoTeste] = useState<"ELETRICO" | "HIDRAULICO" | "AERODINAMICO">("ELETRICO");
  const [resultado, setResultado] = useState<"APROVADO" | "REPROVADO">("APROVADO");

  const handleSubmit = () => {
    if (window.confirm("Confirma o registro deste teste?")) {
      addTeste({ id: Date.now().toString(), aeronave, tipoTeste, resultado });
      alert("Teste registrado com sucesso!");
      navigate("/teste");
    }
  };

  return (
    <div className="teste-container">
      <h1>Registrar Teste</h1>

      <div className="teste-form">
        <select value={aeronave} onChange={e => setAeronave(e.target.value)}>
          <option value="">Selecione a Aeronave</option>
          {aeronaves.map(a => (
            <option key={a.codigo} value={a.codigo}>
              {a.codigo} - {a.modelo}
            </option>
          ))}
        </select>

        <select
          value={tipoTeste}
          onChange={e => setTipoTeste(e.target.value as "ELETRICO" | "HIDRAULICO" | "AERODINAMICO")}
        >
          <option value="ELETRICO">Elétrico</option>
          <option value="HIDRAULICO">Hidráulico</option>
          <option value="AERODINAMICO">Aerodinâmico</option>
        </select>

        <select
          value={resultado}
          onChange={e => setResultado(e.target.value as "APROVADO" | "REPROVADO")}
        >
          <option value="APROVADO">Aprovado</option>
          <option value="REPROVADO">Reprovado</option>
        </select>

        <div className="teste-buttons">
          <button onClick={handleSubmit}>Registrar</button>
          <button onClick={() => navigate("/teste")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}