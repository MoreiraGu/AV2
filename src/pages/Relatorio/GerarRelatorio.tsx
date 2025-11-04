import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../styles/relatorio.css";

export default function GerarRelatorio() {
  const navigate = useNavigate();
  const { aeronaves, pecas, etapas, testes } = useContext(AppContext)!;

  const [aeronaveSelecionada, setAeronaveSelecionada] = useState("");
  const [aeronaveGerada, setAeronaveGerada] = useState("");

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
            if (aeronaveSelecionada) {
                setAeronaveGerada(aeronaveSelecionada);
            } else {
                alert("Selecione uma aeronave!");
            }
            }}
        >
            Gerar Relatório
        </button>
        <button onClick={() => navigate("/relatorio")}>Voltar</button>
        </div>

      {aeronaveGerada && (
        <div className="relatorio-detalhes">
          {relatorio ? (
            <>
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
            </>
          ) : (
            <p>Nenhum relatório disponível para esta aeronave.</p>
          )}
        </div>
      )}
    </div>
  );
}
