import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Teste, Aeronave } from "../../context/AppContext";
import "../../styles/Teste.css";

export default function RegistrarTeste() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [aeronave, setAeronave] = useState("");
  const [tipo, setTipo] = useState<Teste["tipo"]>("ELETRICO");
  const [resultado, setResultado] = useState<Teste["resultado"]>("APROVADO");

  useEffect(() => {
    const fetchAeronaves = async () => {
      try {
        const res = await fetch("http://localhost:3000/aeronaves");
        const data: Aeronave[] = await res.json();
        setAeronaves(data);
      } catch (err) {
        console.error(err);
        alert("Não foi possível carregar aeronaves.");
      }
    };
    fetchAeronaves();
  }, []);

const handleSubmit = async () => {
  if (!aeronave) return alert("Selecione uma aeronave!");
  if (!window.confirm("Confirma o registro deste teste?")) return;

  // Objeto correto para o backend
    const novoTeste = {
      tipo,
      resultado,
      aeronaveCodigo: aeronave,
    };

  try {
    const res = await fetch("http://localhost:3000/testes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoTeste),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.erro || "Erro ao registrar teste");
    }

    alert("Teste registrado com sucesso!");
    navigate("/teste");
  } catch (err: any) {
    console.error(err);
    alert(`Falha ao registrar teste: ${err.message}`);
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
          value={tipo}
          onChange={e => setTipo(e.target.value as Teste["tipo"])}
        >
          <option value="ELETRICO">Elétrico</option>
          <option value="HIDRAULICO">Hidráulico</option>
          <option value="AERODINAMICO">Aerodinâmico</option>
        </select>

        <select
          value={resultado}
          onChange={e => setResultado(e.target.value as Teste["resultado"])}
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
