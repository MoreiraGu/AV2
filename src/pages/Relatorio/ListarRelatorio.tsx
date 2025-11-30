import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aeronave, Peca, Etapa, Teste } from "../../context/AppContext";
import "../../styles/relatorio.css";

export default function ListarRelatorios() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [testes, setTestes] = useState<Teste[]>([]);

  // Puxar dados da API
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [resAero, resPecas, resEtapas, resTestes] = await Promise.all([
          fetch("http://localhost:3000/aeronaves"),
          fetch("http://localhost:3000/pecas"),
          fetch("http://localhost:3000/etapas"),
          fetch("http://localhost:3000/testes")
        ]);

        const [dataAero, dataPecas, dataEtapas, dataTestes] = await Promise.all([
          resAero.json(),
          resPecas.json(),
          resEtapas.json(),
          resTestes.json()
        ]);

        setAeronaves(dataAero);
        setPecas(dataPecas);
        setEtapas(dataEtapas);
        setTestes(dataTestes);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="relatorio-container">
      <h1>Listar Relatórios</h1>

      {aeronaves.length === 0 && <p>Nenhuma aeronave encontrada.</p>}

      {aeronaves.map(relatorio => (
        <div key={relatorio.codigo} className="relatorio-detalhes">
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
      ))}

      <div className="relatorio-botoes">
        <button onClick={() => navigate("/relatorio")}>Voltar</button>
      </div>
    </div>
  );
}
