import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Etapa } from "../../context/AppContext";
import "../../styles/Etapa.css";

export default function CadastroEtapa() {
  const { aeronaves, funcionarios, addEtapa } = useContext(AppContext)!;
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [prazo, setPrazo] = useState("");
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState("");
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState<string[]>([]);

  const toggleFuncionario = (id: string) => {
    if (funcionariosSelecionados.includes(id)) {
      setFuncionariosSelecionados(funcionariosSelecionados.filter(f => f !== id));
    } else {
      setFuncionariosSelecionados([...funcionariosSelecionados, id]);
    }
  };

  const handleSubmit = () => {
    const novaEtapa: Etapa = {
      nome,
      prazo,
      aeronaveCodigo: aeronaveSelecionada,
      funcionarios: funcionariosSelecionados,
      status: "PENDENTE"
    };
    addEtapa(novaEtapa);
    alert("Etapa cadastrada!");
    navigate("/etapa");
  };

  return (
    <div className="etapa-container">
      <h1>Cadastro de Etapa</h1>

      <div className="etapa-form">
        <input
          placeholder="Nome da Etapa"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="date"
          placeholder="Prazo"
          value={prazo}
          onChange={e => setPrazo(e.target.value)}
        />

        <h3>Aeronave</h3>
        <select
          value={aeronaveSelecionada}
          onChange={e => setAeronaveSelecionada(e.target.value)}
        >
          <option value="">Selecione</option>
          {aeronaves.map(a => (
            <option key={a.codigo} value={a.codigo}>
              {a.codigo} - {a.modelo}
            </option>
          ))}
        </select>

        <h3>Funcionários</h3>
        <div className="etapa-funcionarios">
          {funcionarios.map(f => (
            <label key={f.id}>
              <input
                type="checkbox"
                checked={funcionariosSelecionados.includes(f.id)}
                onChange={() => toggleFuncionario(f.id)}
              />
              {f.nome}
            </label>
          ))}
        </div>

        <div className="etapa-buttons">
          <button onClick={handleSubmit}>Cadastrar</button>
          <button onClick={() => navigate("/etapa")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}