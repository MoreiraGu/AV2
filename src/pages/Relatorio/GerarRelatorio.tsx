import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aeronave, Peca, Etapa, Teste } from "../../context/AppContext";
import "../../styles/relatorio.css";

export default function GerarRelatorio() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [testes, setTestes] = useState<Teste[]>([]);

  const [aeronaveSelecionada, setAeronaveSelecionada] = useState("");
  const [aeronaveGerada, setAeronaveGerada] = useState("");

  // Puxar dados da API
  useEffect(() => {
    fetch("http://localhost:3000/aeronaves")
      .then(res => res.json())
      .then(setAeronaves)
      .catch(err => console.error(err));

    fetch("http://localhost:3000/pecas")
      .then(res => res.json())
      .then(setPecas)
      .catch(err => console.error(err));

    fetch("http://localhost:3000/etapas")
      .then(res => res.json())
      .then(setEtapas)
      .catch(err => console.error(err));

    fetch("http://localhost:3000/testes")
      .then(res => res.json())
      .then(setTestes)
      .catch(err => console.error(err));
  }, []);

  const relatorio = aeronaves.find(a => a.codigo === aeronaveGerada);

  return (
    <div className="relatorio-container">
      <h1>Gerar Relatório</h1>

      <select
        value={aeronaveSelecionada}
        onChange={e => setAeronaveSelecionada(e.target.value)}
      >
        <option value="">Selecione a Aeronave</option>
        {aeronaves.map(a => (
          <option key={a.codigo} value={a.codigo}>
            {a.codigo} - {a.modelo}
          </option>
        ))}
      </select>

      <div className="relatorio-botoes">
        <button
          onClick={() => {
            if (aeronaveSelecionada) setAeronaveGerada(aeronaveSelecionada);
            else alert("Selecione uma aeronave!");
          }}
        >
          Gerar Relatório
        </button>
        <button onClick={() => navigate("/relatorio")}>Voltar</button>
      </div>

      {aeronaveGerada && relatorio && (
        <div className="relatorio-detalhes">
          <h2>===== RELATÓRIO =====</h2>
          <p><strong>Aeronave:</strong> {relatorio.codigo} - {relatorio.modelo}</p>
          <p><strong>Tipo:</strong> {relatorio.tipo} | <strong>Capacidade:</strong> {relatorio.capacidade} | <strong>Alcance:</strong> {relatorio.alcance}</p>
          <p><strong>Data de Entrega:</strong> {relatorio.dataEntrega}</p>
          <p><strong>Cliente:</strong> {relatorio.cliente.nome} | <strong>Email:</strong> {relatorio.cliente.email} | <strong>Telefone:</strong> {relatorio.cliente.telefone}</p>

          <h3>--- Peças ---</h3>
          {pecas.filter(p => p.aeronaveCodigo === relatorio.codigo).length > 0
            ? pecas.filter(p => p.aeronaveCodigo === relatorio.codigo).map((p, i) => (
                <p key={i}>{i + 1}. {p.nome} | Tipo: {p.tipo} | Fornecedor: {p.fornecedor} | Status: {p.status}</p>
              ))
            : <p>Nenhuma peça</p>}

          <h3>--- Etapas ---</h3>
          {etapas.filter(e => e.aeronaveCodigo === relatorio.codigo).length > 0
            ? etapas.filter(e => e.aeronaveCodigo === relatorio.codigo).map((e, i) => (
                <p key={i}>{i + 1}. {e.nome} | Prazo: {e.prazo} | Status: {e.status} <br />
                Funcionários: {e.funcionarios.length > 0 ? e.funcionarios.join(", ") : "Nenhum"}</p>
              ))
            : <p>Nenhuma etapa</p>}

          <h3>--- Testes ---</h3>
          {testes.filter(t => t.aeronave === relatorio.codigo).length > 0
            ? testes.filter(t => t.aeronave === relatorio.codigo).map((t, i) => (
                <p key={i}>{i + 1}. Tipo: {t.tipoTeste} | Resultado: {t.resultado}</p>
              ))
            : <p>Nenhum teste</p>}
        </div>
      )}
    </div>
  );
}
