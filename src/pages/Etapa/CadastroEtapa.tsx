import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatusEtapa } from "../../types/enums";
import "../../styles/Etapa.css";

interface Aeronave {
  codigo: string;
  modelo: string;
}

interface Funcionario {
  id: string;
  nome: string;
}

export default function CadastroEtapa() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [prazo, setPrazo] = useState("");
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState("");
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState<string[]>([]);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  // Buscar aeronaves e funcionários ao carregar
  useEffect(() => {
    async function fetchData() {
      try {
        const [aeronavesRes, funcionariosRes] = await Promise.all([
          axios.get("http://localhost:3000/aeronaves"),
          axios.get("http://localhost:3000/funcionarios")
        ]);
        setAeronaves(aeronavesRes.data);
        setFuncionarios(funcionariosRes.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do backend");
      }
    }
    fetchData();
  }, []);

  const toggleFuncionario = (id: string) => {
    if (funcionariosSelecionados.includes(id)) {
      setFuncionariosSelecionados(funcionariosSelecionados.filter(f => f !== id));
    } else {
      setFuncionariosSelecionados([...funcionariosSelecionados, id]);
    }
  };

  const handleSubmit = async () => {
    if (!nome || !prazo || !aeronaveSelecionada) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/etapas", {
        nome,
        prazo,
        aeronaveCodigo: aeronaveSelecionada,
        funcionarios: funcionariosSelecionados
      });
      alert("Etapa cadastrada com sucesso!");
      navigate("/etapa/listar");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao cadastrar etapa");
    }
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
          <button onClick={() => navigate("/etapa/listar")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
